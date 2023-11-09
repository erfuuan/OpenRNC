export default interface IConsume {
	title: string;
	pipelineId: string;
	workspaceId: string;
	data: any;
	status: string;
	createdAt: Date;
	updatedAt: Date;
	deletedAt: Date;
}
