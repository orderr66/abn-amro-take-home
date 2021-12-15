class Node {
	private name: string;
	private description: string;
	private parent: string;

	constructor(node: any) {
		this.name = node.name;
		this.description = node.description;
		this.parent = node.parent;
	}

	public getName(): string {
		return this.name;
	}
	public getDescription(): string {
		return this.description;
	}
	public getParent(): string {
		return this.parent;
	}

}

export default Node