import mongoose from "mongoose";

const ProjectSchema = new mongoose.Schema({
  projectTitle: {  
    type: String, 
    required: true
   },
  projectSiteName: { 
    type: String, 
    required: true 
  },
  projectAddress: { 
    type: String, 
    required: true
   },
  projectPhotos: [
    {type:Array, required:true},
  ],
  projectDetails: { 
    type: String, 
    required: true
   },
  clientReview: { 
    type: String, 
    // required: true 
  },
  completionDuration: { 
    type: String, 
    required: true 
  },
  createdAt: { type: Date, default: Date.now },
});

const ProjectModel = mongoose.model("Project", ProjectSchema);
export default ProjectModel;