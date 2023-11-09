interface IPipeline {
	title: string;
	description: string;
	sourceId: string;
	destinationIds: string[];
	workspaceId: string;
	createdAt: Date;
	updatedAt: Date;
	deletedAt: Date;
}

export default IPipeline