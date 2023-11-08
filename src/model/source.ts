import mongoose from 'mongoose';
import moment from 'jalali-moment';

interface ISource {
	title: string;
	platform: string;
	description: string;
	token: string;
	licence: string;
	workspaceId: string;
	createdAt: Date;
	updatedAt: Date;
	deletedAt: Date;
}

const sourceSchema = new mongoose.Schema(
	{
		title: { type: String, required: true },
		platform: { type: String, required: true, enum: ['web', 'flutter', 'android', 'ios'] },
		description: String,
		token: { type: String, required: true },
		licence: { type: String, required: true },
		// workspaceId: { type: mongoose.Types.ObjectId, ref: 'workspace', required: true },
		workspaceId: { type: String, required: true },
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
const Source = mongoose.model<ISource>('Source', sourceSchema);
export default Source;
