import mongoose from 'mongoose';
import moment from 'jalali-moment';

interface IConsume {
	title: string;
	pipelineId: string;
	workspaceId: string;
	data: any;
	status: string;
	createdAt: Date;
	updatedAt: Date;
	deletedAt: Date;
}

const consumeSchema = new mongoose.Schema(
	{
		title: { type: String, required: true },
		// pipelineId: {
		//   type: mongoose.Types.ObjectId,
		//   ref: "Pipeline",
		//   required: true,
		// },
		pipelineId: { type: String, required: true },
		// workspaceId: { type: mongoose.Types.ObjectId, ref: 'workspace', required: true },
		workspaceId: { type: String, required: true },
		data: { type: Object, required: true },
		status: {
			type: String,
			required: true,
			enum: ['todo', 'inProgress', 'done'],
			default: 'todo',
		},
		createdAt: {
			type: Number,
			required: true,
			default: moment(new Date()).format('X'),
		},
		updatedAt: Number,
		deletedAt: { type: Boolean, default: false },
	},
	{
		versionKey: false,
	}
);
const Consume = mongoose.model<IConsume>('Consume', consumeSchema);
export default Consume;
