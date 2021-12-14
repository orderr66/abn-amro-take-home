class Node {
	private name: string;
	private description: string;
	private parent: string;

	constructor(node: any) {
		this.name = node.name;
		this.description = node.description;
		this.parent = node.parent;
	}
}

export default Node