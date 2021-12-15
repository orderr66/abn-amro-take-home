<template>
<div class="container">
   <div>
    <form :key="componentKey" @submit="onSubmit" class="form-container">
      <div class="form-group">
        <label class="input-label" for="name"> Node </label>
        <input
          type="text"
          v-model="name"
          class="node-input"
          id="name" required>
      </div>
      <div class="form-group">
        <label class="input-label" for="parent"> Parent Node </label>
        <input
          type="text"
          v-model="parent"
          class="node-input"
          id="parent" required>
      </div>
      <div class="form-group">
        <label class="input-label" for="description"> Description </label>
        <input
          type="text"
          v-model="description"
          class="description-input"
          id="description"
          required>
      </div>
      <button type="submit" class="button-3">Add Node</button>
    </form>
  </div>
    <div class="container-animation">
    <Popup v-if="isPopupTriggered" :togglePopup = "()=>togglePopup()" :onClickDelete = "()=> onClickDelete()" :node="this.node"/>
    <div class="checkbox-container">
      <input class="checkbox" type="checkbox" id="checkbox" v-model="isAnimationChecked">
      <label class="checkbox-label" for="checkbox"> Animation </label>
    </div>
  </div>
</div>
</template>
<script>
import * as d3 from 'd3';
import Popup from './Popup.vue';
import NodeService from '../services/NodeService';

export default {
  name: "TreeComponent",
    components: {
      Popup
  },
  props: ['newNode'],
  data(){
    return {
      nodeData: {},
      hierarchicalData: {},
      node: {},
      isPopupTriggered: false,
      isAnimationChecked: false,
      name: '',
      description: '',
      parent: '',
      componentKey: 1
    };
  },
  async mounted() {
    await this.fetchData();
    this.generateTreeDiagram()
  },

   created() {
      this.margin = {top: 20, right: 120, bottom: 20, left: 120};
      this.width = 960 - this.margin.right - this.margin.left;
      this.height = 500 - this.margin.top - this.margin.bottom;
      this.nodeIndex = 0;
      this.duration  = 750;
      this.root;
      this.tree = d3.layout.tree().size([this.height, this.width]);
      this.diagonal = d3.svg.diagonal().projection(d=>[d.y, d.x]);
      this.svg = d3.select("body").append("svg")
                .attr("width", this.width + this.margin.right + this.margin.left)
                .attr("height", this.height + this.margin.top + this.margin.bottom)
                .append("g")
                .attr("transform", "translate(" + this.margin.left + "," + this.margin.top + ")");
  },
  methods: {

   async onClickDelete() {
     if(this.node.children) {
       alert("Sorry! you cant delete node with childrens ")
       return
     }else if(this.node.parent === ""){
        alert("Sorry! you cant delete Root node!")
       return
      } else {
        await NodeService.deleteNode(this.node);
        let isRemoved = this.removeNode([this.hierarchicalData], this.node.name)
        if(isRemoved) this.generateTreeDiagram();
        this.togglePopup();
    }
   },
   async onSubmit(e) {
      e.preventDefault();
      const newNode = {
        name: this.name,
        description: this.description,
        parent: this.parent
      }
      let data = await NodeService.createNode(newNode);
      this.addNewNode(data)
      this.name = '';
      this.description = '';
      this.parent = '';
    },
    removeNode(array, name){
      for (var i = 0; i < array.length; ++i) {
          var obj = array[i];
          if (obj.name === name) {
              array.splice(i, 1);
              return true;
          }
          if (obj.children) {
              if (this.removeNode(obj.children, name)) {
                  if (obj.children.length === 0) {
                      delete obj.children;
                  }
                  return true;
              }
          }
      }
    },
    addNewNode(node) {
      let nodeToBePushed = this.findObjectById(this.hierarchicalData, node.parent);
      console.log(nodeToBePushed)
      if(!nodeToBePushed.children){
        nodeToBePushed.children = [];
        nodeToBePushed.children.push(node);
      }else {
        nodeToBePushed.children.push(node)}
        this.generateTreeDiagram();
    },
    findObjectById (root, id) {
         if (root.name == id){
            return root;
          }
        if (root.children) {
          for (var k in root.children) {
            if (root.children[k].name == id) {
              return root.children[k];
            }
            else if (root.children[k].children) {
              let result = this.findObjectById(root.children[k], id);
              if (result) {
                return result;
              }
            }
          }
        }
    },
    async fetchData() {
      let data = await NodeService.getNodes();
      this.nodeData = data;
      this.hierarchicalData = this.prepareData(this.nodeData)[0]
    },

    togglePopup() {
      this.isPopupTriggered = !this.isPopupTriggered;
    },
    generateTreeDiagram(){
      this.root = this.hierarchicalData;
      this.root.x0 = this.height / 2;
      this.root.y0 = 0;
      this.updateTreeView();
      d3.select(self.frameElement).style("height", "500px");
    },
    updateTreeView(source = this.root){
      // Compute the new tree layout.
      let nodes = this.tree.nodes(this.root).reverse()
      let links = this.tree.links(nodes);

      // Normalize for fixed-depth.
      nodes.forEach(d=>{ d.y = d.depth * 180; });

      // Update the nodes…
      let node = this.svg.selectAll("g.node")
        .data(nodes, d => d.id || (d.id = ++this.nodeIndex));

      // Enter any new nodes at the parent's previous position.
      let nodeEnter = node.enter().append("g")
        .attr("class", "node")
        .attr("transform", () => "translate(" + source.y0 + "," + source.x0 + ")")
        .on("click", this.onNodeClick);

      nodeEnter.append("circle")
        .attr("r", 1e-6)
        .style("fill", d => d._children ? "lightsteelblue" : "#fff");

      nodeEnter.append("text")
        .attr("x", (d) => d.name.includes("-") ? -9 : -4)
        .attr("y", 4.5)
        .text(d => d.name)
        .style("fill-opacity", 1e-6);

      // Transition nodes to their new position.
      let nodeUpdate = node.transition()
        .duration(this.duration)
        .attr("transform", d => "translate(" + d.y + "," + d.x + ")");

      nodeUpdate.select("circle")
        .attr("r", 14)
        .style("fill", d => d._children ? "lightsteelblue" : "#fff");

      nodeUpdate.select("text")
        .style("fill-opacity", 1);

      // Transition exiting nodes to the parent's new position.
      let nodeExit = node.exit().transition()
        .duration(this.duration)
        .attr("transform", () => "translate(" + source.y + "," + source.x + ")")
        .remove();

      nodeExit.select("circle")
        .attr("r", 1e-6);

      nodeExit.select("text")
        .style("fill-opacity", 1e-6);

      // Update the links…
      let link = this.svg.selectAll("path.link")
        .data(links, d => d.target.id);

      // Enter any new links at the parent's previous position.
      link.enter().insert("path", "g")
        .attr("class", "link")
        .attr("d", () => {
        var o = {x: source.x0, y: source.y0};
        return this.diagonal({source: o, target: o});
        });

      // Transition links to their new position.
      link.transition()
        .duration(this.duration)
        .attr("d", this.diagonal);

      // Transition exiting nodes to the parent's new position.
      link.exit().transition()
        .duration(this.duration)
        .attr("d", () => {
        var o = {x: source.x, y: source.y};
        return this.diagonal({source: o, target: o});
        })
        .remove();

      // Stash the old positions for transition.
      nodes.forEach(d => {
      d.x0 = d.x;
      d.y0 = d.y;
      });
    },
    onNodeClick(d){
      if(this.isAnimationChecked) {
        if (d.children) {
          d._children = d.children;
          d.children = null;
        } else {
          d.children = d._children;
          d._children = null;
        }
          this.updateTreeView(d);
      } else {
        this.togglePopup();
        this.node = d;
      }
    },
    prepareData(data) {
        let roots = [], children = {};
        for (let i = 0, len = data.length; i < len; ++i) {
          let item = data[i],
              p = item.parent,
              target = !p ? roots : (children[p] || (children[p] = []));

          target.push(item);
      }
      let findChildren = function(parent) {
        if (children[parent.name]) {
            parent.children = children[parent.name];
            for (let i = 0, len = parent.children.length; i < len; ++i) {
                findChildren(parent.children[i]);
            }
        }
      };
      for (let i = 0, len = roots.length; i < len; ++i) {
        findChildren(roots[i]);
      }

      return roots;
    }
  }
}
</script>

<style>
  .node {
    cursor: pointer;
  }
  .node circle {
    fill: #fff;
    stroke: black;
    stroke-width: 3px;
  }
  .node text {
    font: 12px sans-serif;
  }
  .link {
    fill: none;
    stroke: #ccc;
    stroke-width: 2px;
  }
  .container {
    display: flex;
    gap: 10%;
  }
  .container-animation {
    padding-top: 5px;
  }
  .checkbox-container {
    display: flex;
  }
  .checkbox {
    height: 20px;
    width: 20px;
  }
  .checkbox-label {
    padding: 3px;
    font-size: 17px;
  }
  .form-container {
  display: flex;
  gap: 20px;
}
.input-label {
  margin: 4px;
}
.node-input {
  border: 1px solid #ccc;
  border-radius: 4px;
  height: 20px;
  width: 30px;
  padding: 4px;
}
.description-input {
  border: 1px solid rgba(27, 31, 35, .15);
  border-radius: 6px;
  height: 20px;
  padding: 6px 16px;
}

/* CSS */
.button-3 {
  appearance: none;
  background-color: #2ea44f;
  border: 1px solid rgba(27, 31, 35, .15);
  border-radius: 6px;
  box-shadow: rgba(27, 31, 35, .1) 0 1px 0;
  box-sizing: border-box;
  color: #fff;
  cursor: pointer;
  display: inline-block;
  font-family: -apple-system,system-ui,"Segoe UI",Helvetica,Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji";
  font-size: 14px;
  font-weight: 600;
  line-height: 20px;
  padding: 6px 16px;
  position: relative;
  text-align: center;
  text-decoration: none;
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
  vertical-align: middle;
  white-space: nowrap;
}

.button-3:focus:not(:focus-visible):not(.focus-visible) {
  box-shadow: none;
  outline: none;
}

.button-3:hover {
  background-color: #2c974b;
}

.button-3:focus {
  box-shadow: rgba(46, 164, 79, .4) 0 0 0 3px;
  outline: none;
}

.button-3:disabled {
  background-color: #94d3a2;
  border-color: rgba(27, 31, 35, .1);
  color: rgba(255, 255, 255, .8);
  cursor: default;
}

.button-3:active {
  background-color: #298e46;
  box-shadow: rgba(20, 70, 32, .2) 0 1px 0 inset;
}
</style>

