import { TrustProductsEntityAssignmentsInstance } from "twilio/lib/rest/trusthub/v1/trustProducts/trustProductsEntityAssignments.js";
import { DesignModel } from "../Models/Designs.Schema.js";
import { FurnitureModel } from "../Models/Furniture.Schema.js";
import { InteriorWorkModel } from "../Models/Interior.Schema.js";
import { KitchenModel } from "../Models/Kitchen.Schema.js";
import { MarqueModel } from "../Models/Marque.Schema.js";
import  ProjectModel  from "../Models/Project.Schema.js";
import { VideoModel } from "../Models/Service.Video.Schema.js";
import { SlideModel } from "../Models/Slider.Schema.js";
import { SofaWorkModel } from "../Models/Sofa.Schema.js";
import { uploadImageToCloudinary } from "../Utils/cloudinary.db.js";
import { singlePhotoUploadOnCloud } from "../Utils/signle.cloudinary.upload.js";
import { LatestProjModel } from "../Models/Latest.Proj.js";
import { HeroSecModel } from "../Models/HeroSec.Schema.js";
import { HeroServiceModel } from "../Models/HeroService.js";


// This Section is only for project routes related ::
export const addingNewProjectController = async (req, res)=>{
    const {projectTitle, projectSiteName, projectAddress,projectDetails, clientReview, completionDuration} = req.body;
    // console.log(req.body);
    // console.log(projectTitle, projectSiteName, projectAddress,projectDetails, clientReview, completionDuration);
    console.log("This is req.file ", req.file);
    
    
    try {
        if(!projectTitle || !projectSiteName || !projectAddress || !projectDetails || !completionDuration) {
            console.log(projectTitle, projectSiteName, projectAddress,projectDetails, clientReview, completionDuration);
            return res.status(400).json({message:"Invalid Credentials all fields are required"});
        }
        const uploadPromises = req.files.url.map((file, index) => {
            return uploadImageToCloudinary(file, index);
          });
        const uploadResults = await Promise.all(uploadPromises);
        const projectUploaded = await ProjectModel.create({projectTitle, projectSiteName, projectAddress,projectDetails, clientReview, completionDuration, projectPhotos:uploadResults});
        return res.status(201).json({message:"New Project has successfully added", projectData:projectUploaded});
    } catch (error) {
        console.log("There are some errors in your addingNewProjectController so plz fix the bug first ", error);
        return res.status(500).json({message:"There are some errors in your addingNewProjectController so plz fix the bug first ", error});
    }
}
export const projectDetailsUpdatingController = async (req, res)=>{
    const {projectTitle, projectSiteName, projectAddress,projectDetails, clientReview, completionDuration} = req.body.formData;
    console.log(projectTitle, projectSiteName, projectAddress,projectDetails, clientReview, completionDuration);
    
    const projectId = req.params.id;
    try {
        const updatedProject = await ProjectModel.findByIdAndUpdate(projectId, {projectTitle, projectSiteName, projectAddress,projectDetails, clientReview, completionDuration});
        return res.status(201).json({message:"Your Project Details has been successfully updated ", project:updatedProject});
    } catch (error) {
        console.log("There are some errors in your projectDetailsUpdatingController controller plz fix the bug first ", error);
        return res.status(500).json({message:"There are some errors in your projectDetailsUpdatingController controller plz fix the bug first ", error});
    }
}
export const projectDeletingController = async (req, res)=>{
    const projectID = req.params.id;
    try {
        const deletedProject = await ProjectModel.findByIdAndDelete(projectID);
        return res.status(200).json({message:"Project has been successfully deleted"});
    } catch (error) {
        console.log("There are some errors in your projectDeletingController plz fix the bug first ", error);
        return res.status(500).json({message:"There are some errors in your projectDeletingController plz fix the bug first ", error});
    }
}
export const getAllUploadedProjects = async (req, res)=>{
    try {
        const allProjects = await ProjectModel.find();
        return res.status(200).json({allProjects});
    } catch (error) {
        console.log("There are some errors in your getAllUploadedProjects controller plz fix the bug first ", error);
        return res.status(500).json({message:"There are some errors in your getAllUploadedProjects controller plz fix the bug first ", error});
    }
}

export const addingNewSofaProjectController = async (req, res)=>{
    const {clientName,sofaName,sofaDetails} = req.body;
    try {
        if(!clientName || !sofaName || !sofaDetails) {
            console.log(clientName,sofaName,sofaDetails);
            return res.status(400).json({message:"Invalid Credentials all fields are required"});
        }
       
        console.log("This is req.file",req.files);
        
        const uploadPromises = req.files.url.map((file, index) => {
            return uploadImageToCloudinary(file, index);
          });
          const uploadResults = await Promise.all(uploadPromises);
          console.log("this is uploadResults", uploadResults);
          const uploadedSofa = await SofaWorkModel.create({clientName,sofaName,sofaDetails, sofaImages:uploadResults});
          return res.status(201).json({message:"New Sofa Project Uploaded", uploadedSofa});
    } catch (error) {
        console.log("There are some errors in your addingNewSofaProjectController plz fix the bug first ", error);
        return res.status(500).json({message:"There are some errors in your addingNewSofaProjectController plz fix the bug first ", error});
    }
}
export const updateSofaProjectDetails = async (req, res)=>{
    const {clientName,sofaName,sofaDetails} = req.body.formData;
    const sofaId = req.params.id;
    console.log("This is req.body.formData", req.body.formData);
    console.log("This is clientName,sofaName,sofaDetails",  clientName,sofaName,sofaDetails);
    try {
        if(!clientName || !sofaName || !sofaDetails) {
            console.log(clientName,sofaName,sofaDetails);
            return res.status(400).json({message:"Invalid Credentials all fields are required"});
        }
        const updatedSofaDetails = await SofaWorkModel.findByIdAndUpdate(sofaId, {clientName,sofaName,sofaDetails});
        return res.status(201).json({message:"Your Sofa Details has been successfully updated ", updatedSofaDetails});
    } catch (error) {
        console.log("There are some errors in your updateSofaProjectDetails plz fix the bug first ", error);
        return res.status(500).json({message:"There are some errors in your updateSofaProjectDetails plz fix the bug first ", error});
    }
}
export const sofaDeletingController = async (req, res)=>{
    const sofaID = req.params.id;
    try {
        const deletedSofa = await SofaWorkModel.findByIdAndDelete(sofaID);
        return res.status(200).json({message:"Your Sofa Project has been successfully deleted"});
    } catch (error) {
        console.log("There are some errors in your sofaDeletingController plz fix the bug first ", error);
        return res.status(500).json({message:"There are some errors in your sofaDeletingController plz fix the bug first ", error});
    }
}
export const getAllSofaProjects = async (req, res)=>{
    try {
        const allSofaProjects = await SofaWorkModel.find();
        return res.status(200).json({allSofaProjects});
    } catch (error) {
        console.log("There are some errors in your getAllSofaProjects plz fix the bug first " , error);
        return res.status(500).json({message:"There are some errors in your getAllSofaProjects plz fix the bug first " , error});
    }
}
export const addingNewInteriorServiceController = async (req, res)=>{
    const {clientName, interiorTitle, interiorDetails, clientReview} = req.body;
    try {
        if(!interiorTitle || !interiorDetails) {
            console.log(clientName, interiorTitle, interiorDetails, clientReview);
            return res.status(400).json({message:"Invalid Credentials all fields are required"});
        }
        const uploadPromises = req.files.url.map((file, index) => {
            return uploadImageToCloudinary(file, index);
          });
          const uploadResults = await Promise.all(uploadPromises);
          const uploadedInteriorProject = await InteriorWorkModel.create({clientName, interiorTitle, interiorDetails, clientReview, interiorImages:uploadResults});
          return res.status(201).json({message:"Congratulations your interior project has been successfully uploaded ", uploadedInteriorProject});
    } catch (error) {
       console.log("There are some errors in your addingNewInteriorServiceController plz fix the bug first ", error);
        return res.status(500).json({message:"There are some errors in your addingNewInteriorServiceController plz fix the bug first ", error});
    }
}
export const updatePrevInteriorServiceController = async (req, res)=>{
    const {clientName, interiorTitle, interiorDetails, clientReview} = req.body.formData;
    const projectID = req.params.id;
    try {
        if(!interiorTitle || !interiorDetails) {
            console.log(clientName, interiorTitle, interiorDetails, clientReview);
            return res.status(400).json({message:"Invalid Credentials all fields are required"});
        }
        const updatedInteriorService = await InteriorWorkModel.findByIdAndUpdate(projectID, {clientName, interiorTitle, interiorDetails, clientReview});
        return res.status(201).json({message:"Your Interior Service has been successfully updated ", updatedInteriorService});
    } catch (error) {
        console.log("There are some errors in your updatePrevInteriorServiceController plz fix the bug first ", error);
        return res.status(500).json({message:"There are some errors in your updatePrevInteriorServiceController plz fix the bug first ", error});
    }
}
export const deletingInteriorProjectController = async (req, res)=>{
    const id = req.params.id;
    try {
        const deletedInteriorService = await InteriorWorkModel.findByIdAndDelete(id);
        return res.status(200).json({message:"Your project has been successfully deleted"});
    } catch (error) {
        console.log("There are some errors in your deletingInteriorProjectController plz fix the bug first ", error);
        return res.status(500).json({message:"There are some errors in your deletingInteriorProjectController plz fix the bug first ", error});
    }
}
export const getAllInteriorServicesProjects = async (req, res)=>{
    try {
        const getAllInteriorServices = await InteriorWorkModel.find();
        return res.status(200).json({getAllInteriorServices});
    } catch (error) {
        console.log("There are some errors in your getAllInteriorServicesProjects plz fix the bug first ", error);
        return res.status(500).json({message:"There are some errors in your getAllInteriorServicesProjects plz fix the bug first ", error});
    }
}
export const addingNewDesigningServicesController = async (req, res)=>{
    const {designName, designCategory, designDetails, designerName} = req.body;
    try {
        if(!designName || !designCategory || !designDetails) {
            console.log(designName, designCategory, designDetails, designerName);
            return res.status(400).json({message:"Invalid Credentials all fields are required"});
        }
        const uploadPromises = req.files.url.map((file, index) => {
            return uploadImageToCloudinary(file, index);
          });
          const uploadResults = await Promise.all(uploadPromises);
          const uploadedNewDesign = await DesignModel.create({designName, designCategory, designDetails, designerName, designImages:uploadResults});
          return res.status(201).json({uploadedNewDesign});
    } catch (error) {
        console.log("There are some errors in your addingNewDesigningServicesController plz fix the bug first ", error);
        return res.status(500).json({message:"There are some errors in your addingNewDesigningServicesController plz fix the bug first ", error});
    }
}
export const updatingPrevDesigningServices = async (req, res)=>{
    const {designName, designCategory, designDetails, designerName} = req.body.formData;
    const designID = req.params.id;
    try {
        const updatedDesignDetails = await DesignModel.findByIdAndUpdate(designID, {designName, designCategory, designDetails, designerName});
        return res.status(201).json({updatedDesignDetails});
    } catch (error) {
        console.log("There are some errors in your updatingPrevDesigningServices plz fix the bug first ", error);
        return res.status(500).json({message:"There are some errors in your updatingPrevDesigningServices plz fix the bug first ", error});
    }
}
export const deletePrevDesignController = async (req, res)=>{
    const designID = req.params.id;
    try {
        const deletedDesign = await DesignModel.findByIdAndDelete(designID);
        return res.status(200).json({message:"Your Design has been successfully deleted"});
    } catch (error) {
        console.log("There are some errors in your deletePrevDesignController plz fix the bug first ", error);
        return res.status(500).json({message:"There are some errors in your deletePrevDesignController plz fix the bug first ", error});
    }
}
export const getAllDesignController = async (req, res)=>{
    try {
        const getAllDesigns = await DesignModel.find();
        return res.status(200).json({getAllDesigns});
    } catch (error) {
        console.log("There are some errors in your getAllDesignController plz fix the bug first ", error);
        return res.status(500).json({message:"There are some errors in your getAllDesignController plz fix the bug first ", error});
    }
}
export const addingNewFurnitureServiceController = async (req, res)=>{
    const {clientName,furnitureName,furnitureType,furnitureDetails,priceRange} = req.body;
    try {
        if(!furnitureName || !furnitureType || !furnitureDetails || !priceRange) {
            console.log(clientName,furnitureName,furnitureType,furnitureDetails,furnitureImages,priceRange);
            return res.status(400).json({message:"Invalid Credentials all fields are required"});
        }
        const uploadPromises = req.files.url.map((file, index) => {
            return uploadImageToCloudinary(file, index);
          });
          const uploadResults = await Promise.all(uploadPromises);
          const addedFurniture = await FurnitureModel.create({clientName,furnitureName,furnitureType,furnitureDetails,furnitureImages:uploadResults,priceRange});
          return res.status(201).json({addedFurniture});
    } catch (error) {
        console.log("There are some errors in your addingNewFurnitureServiceController plz fix the bug first ", error);
        return res.status(500).json({message:"There are some errors in your addingNewFurnitureServiceController plz fix the bug first ", error});
    }
}
export const UpdatePrevFurnitureServiceController = async (req, res)=>{
    const {clientName,furnitureName,furnitureType,furnitureDetails,priceRange} = req.body.formData;
    const id = req.params.id;
    try {
        if(!furnitureName || !furnitureType || !furnitureDetails || !priceRange) {
            console.log(clientName,furnitureName,furnitureType,furnitureDetails,furnitureImages,priceRange);
            return res.status(400).json({message:"Invalid Credentials all fields are required"});
        }
        const updatedFurnitureDetails = await FurnitureModel.findByIdAndUpdate(id, {clientName,furnitureName,furnitureType,furnitureDetails,priceRange});
        return res.status(201).json({updatedFurnitureDetails});
    } catch (error) {
        console.log("There are some errors in your UpdatePrevFurnitureServiceController plz fix the bug first ", error);
        return res.status(500).json({message:"There are some errors in your UpdatePrevFurnitureServiceController plz fix the bug first ", error});
    }
}
export const deletePrevFurnitureServiceController = async (req, res)=>{
    const id = req.params.id;
    try {
        const deletedFurnitureService = await FurnitureModel.findByIdAndDelete(id);
        return res.status(200).json({message:"Your Furniture Service has been successfully deleted"});
    } catch (error) {
        console.log("There are some errors in your deletePrevFurnitureServiceController plz fix the bug first ", error);
        return res.status(500).json({message:"There are some errors in your deletePrevFurnitureServiceController plz fix the bug first ", error});
    }
}
export const getAllFurnitureServiceController = async (req, res)=>{
    try {
        const getAllFurnitureService = await FurnitureModel.find();
        return res.status(200).json({getAllFurnitureService});
    } catch (error) {
        console.log("There are some errors in your getAllFurnitureServiceController plz fix the bug first ", error);
        return res.status(500).json({message:"There are some errors in your getAllFurnitureServiceController plz fix the bug first ", error});
    }
}
export const addingNewModuloKitchenServiceController = async (req, res)=>{
    const {clientName,kitchenName,kitchenDetails, priceRange} = req.body;
    try {
        if(!kitchenName || !kitchenDetails || !priceRange) {
            console.log(clientName,kitchenName,kitchenDetails);
            return res.status(400).json({message:"Invalid Credentials all fields are required"});
        }
        const uploadPromises = req.files.url.map((file, index) => {
            return uploadImageToCloudinary(file, index);
          });
          const uploadResults = await Promise.all(uploadPromises);
          const addedKitchenProject = await KitchenModel.create({clientName,kitchenName,kitchenDetails,kitchenImages:uploadResults, priceRange});
          return res.status(201).json({addedKitchenProject});
    } catch (error) {
        console.log("There are some errors in your addingNewModuloKitchenServiceController plz fix the bug first ", error);
        return res.status(500).json({message:"There are some errors in your addingNewModuloKitchenServiceController plz fix the bug first ", error});
    }
}
export const updatingPrevModuloKitchenServiceController = async (req, res)=>{
    const id = req.params.id;
    const {clientName,kitchenName,kitchenDetails, priceRange} = req.body.formData;
    try {
        if(!kitchenName || !kitchenDetails || !priceRange) {
            console.log(clientName,kitchenName,kitchenDetails,priceRange);
            return res.status(400).json({message:"Invalid Credentials all fields are required"});
        }
        const updatedKitchenDetails = await KitchenModel.findByIdAndUpdate(id, {clientName,kitchenName,kitchenDetails, priceRange});
        return res.status(201).json({updatedKitchenDetails});
    } catch (error) {
        console.log("There are some errors in your updatingPrevModuloKitchenServiceController plz fix the bug first ", error);
        return res.status(500).json({message:"There are some errors in your updatingPrevModuloKitchenServiceController plz fix the bug first ", error}); 
    }
}
export const deletingPrevModuloKitchenServiceController = async (req, res)=>{
    const id = req.params.id;
    try {
        const deletedKitchenProj = await KitchenModel.findByIdAndDelete(id);
        return res.status(200).json({message:"Your Kitchen Project has been successfully deleted"});
    } catch (error) {
        console.log("There are some errors in your deletingPrevModuloKitchenServiceController plz fix the bug first ", error);
        return res.status(500).json({message:"There are some errors in your deletingPrevModuloKitchenServiceController plz fix the bug first ", error}); 
    }
}
export const getAllModuloKitchenServiceController = async (req, res)=>{
    try {
        const getAllKitchenProjects = await KitchenModel.find();
        return res.status(200).json({getAllKitchenProjects});
    } catch (error) {
        console.log("There are some errors in your getAllModuloKitchenServiceController plz fix the bug first ", error);
        return res.status(500).json({message:"There are some errors in your getAllModuloKitchenServiceController plz fix the bug first ", error}); 
    }
}
export const addingSliderObjController = async (req, res)=>{
    const {challenge,result,clientName} = req.body;
    const photo = req.file ? req.file.path : null;
    try {
        if(!challenge || !result || !clientName || !photo) {
            console.log(challenge,result,clientName, photo);
            return res.status(400).json({message:"Invalid Credentials All fields are required"});
        }
        const slideImg = await singlePhotoUploadOnCloud(photo);
        if(!slideImg) {
            console.log(photo);
            return res.status(400).json({message:"Invalid Credentials slide photo is required"});
        }
        const slideUploaded = await SlideModel.create({challenge,result,clientName, url:slideImg});
        return res.status(201).json({slideUploaded});
    } catch (error) {
        console.log("There are some errors in your addingSliderObjController plz fix the bug first ", error);
        return res.status(500).json({message:"There are some errors in your addingSliderObjController plz fix the bug first ", error});
    }
}
export const updateSliderPrevObj = async (req, res)=>{
    const {challenge,result,clientName} = req.body;
    const id = req.params.id;
    try {
        if(!challenge || !result || !clientName) {
            console.log(challenge,result,clientName);
            return res.status(400).json({message:"Invalid Credentials All Fields Are Required"});
        }
        const updatedSlider = await SlideModel.findByIdAndUpdate(id, {challenge,result,clientName});
        return res.status(201).json({updatedSlider});
    } catch (error) {
        console.log("There are some errors in your updateSliderPrevObj plz fix the bug first ", error);
        return res.status(500).json({message:"There are some errors in your updateSliderPrevObj plz fix the bug first ", error});
    }
}
export const deletePrevSliderObj = async (req, res)=>{
    const id = req.params.id;
    try {
        const deletedSlider = await SlideModel.findByIdAndDelete(id);
        return res.status(200).json({message:"Your Slider Has Been Successfully Deleted"});
    } catch (error) {
        console.log("There are some errors in your deletePrevSliderObj plz fix the bug first ", error);
        return res.status(500).json({message:"There are some errors in your deletePrevSliderObj plz fix the bug first ", error});
    }
}
export const getAllSliderImg = async (req, res)=>{
    try {
        const allSlides = await SlideModel.find();
        return res.status(200).json({allSlides});
    } catch (error) {
        console.log("There are some errors in your getAllSliderImg plz fix the bug first ", error);
        return res.status(500).json({message:"There are some errors in your getAllSliderImg plz fix the bug first ", error});
    }
}
export const addingNewVideoController = async (req, res)=>{
    const {title,videoUrl,description} = req.body;

    try {
        if(!title || !videoUrl || !description) {
            return res.status(400).json({message:"Invalid credentials all fields are required"});
        }
    } catch (error) {
        console.log("There are some errors in your addingNewVideoController plz fix the bug first ", error);
        return res.status(500).json({message:"There are some errors in your addingNewVideoController plz fix the bug first ", error});
    }
}
export const updatePrevVideoController = async (req, res) =>{
    const {title,videoUrl,description} = req.body;
    const id = req.params.id;
    try {
        if(!title || !videoUrl || !description) {
            return res.status(400).json({message:"Invalid credentials all fields are required"});
        }
        const updatedVideoSection = await VideoModel.findByIdAndUpdate(id, {title,videoUrl,description});
        return res.status(201).json({updatedVideoSection});
    } catch (error) {
        console.log("There are some errors in your updatePrevVideoController plz fix the bug first ", error);
        return res.status(500).json({message:"There are some errors in your updatePrevVideoController plz fix the bug first ", error});
    }
}
export const deletePrevVideoController = async (req, res)=>{
    const id = req.params.id;
    try {
        const deletedVideoSection = await VideoModel.findByIdAndDelete(id);
        return res.status(200).json({message:"Video Section Has Been Successfully deleted"});
    } catch (error) {
        console.log("There are some errors in your deletePrevVideoController plz fix the bug first ", error);
        return res.status(500).json({message:"There are some errors in your deletePrevVideoController plz fix the bug first ", error});
    }
}
export const getAllVideoController = async (req, res)=>{
    try {
        const videoSection = await VideoModel.find();
        return res.status(200).json({videoSection});
    } catch (error) {
        console.log("There are some errors in your getAllVideoController plz fix the bug first ", error);
        return res.status(500).json({message:"There are some errors in your getAllVideoController plz fix the bug first ", error});
    }
}
export const addingNewMarqueSentencesController = async (req, res)=> {
    const {sentence} = req.body;
    try {
        if(!sentence) {
            console.log(sentence);
            return res.status(400).json({message:"Invalid Credentials all fields are required"});
        }
        const uploadPromises = req.files.map((file, index) => {
            return uploadImageToCloudinary(file, index);
          });
          const uploadResults = await Promise.all(uploadPromises);
          if(!uploadResults) {
            console.log(uploadResults);
            return res.status(400).json({message:"Invalid Credentials all fields are required"});
          }
          const marqueData = await MarqueModel.create({sentence, images:uploadResults});
          return res.status(201).json({marqueData});
    } catch (error) {
        console.log("There are some errors in your addingNewMarqueSentencesController plz fix the bug first ", error);
        return res.status(500).json({message:"There are some errors in your addingNewMarqueSentencesController plz fix the bug first ", error});
    }
}
export const updatingPrevMarqueSentencesController = async (req, res)=>{
    const {sentence} = req.body;
    const id = req.params.id;
    try {
        if(!sentence) {
            console.log(sentence);
            return res.status(400).json({message:"Invalid Credentials all fields are required"});
        }
        const updatedMarque = await MarqueModel.findByIdAndUpdate(id, {sentence});
        return res.status(201).json({updatedMarque});
    } catch (error) {
        console.log("There are some errors in your updatingPrevMarqueSentencesController plz fix the bug first ", error);
        return res.status(500).json({message:"There are some errors in your updatingPrevMarqueSentencesController plz fix the bug first ", error});
    }
}
export const deletingPrevMarqueSentencesController = async (req ,res)=>{
    const id = req.params.id;
    try {
        const deletedMarque = await MarqueModel.findByIdAndDelete(id);
        return res.status(200).json({message:"Marque Deleted Successfully"});
    } catch (error) {
        console.log("There are some errors in your deletingPrevMarqueSentencesController plz fix the bug first ", error);
        return res.status(500).json({message:"There are some errors in your deletingPrevMarqueSentencesController plz fix the bug first ", error});
    }
}
export const getMarqueSentencesController = async (req, res)=>{
    try {
        const marqueDetails = await MarqueModel.find();
        return res.status(200).json({marqueDetails});
    } catch (error) {
        console.log("There are some errors in your getMarqueSentencesController plz fix the bug first ", error);
        return res.status(500).json({message:"There are some errors in your getMarqueSentencesController plz fix the bug first ", error});
    }
}
export const addingNewLatestProjectController = async (req, res)=>{
    const {projectTitle,projectDetails} = req.body;
    try {
        if(!projectTitle || !projectDetails) {
            console.log(projectTitle, projectDetails);
            return res.status(400).json({message:"Invalid Credentials all fields are required"});
        }
        console.log("This is files" , req.files.url);
        
        const uploadPromises = await req.files.url.map((file, index) => {
            return uploadImageToCloudinary(file, index);
          });
          const uploadPromisesVideo = await req.files.video.map((file, index) => {
            return uploadImageToCloudinary(file, index);
          });
          const uploadResults = await Promise.all(uploadPromises);
          const uploadResultsVideo = await Promise.all(uploadPromisesVideo);
          if(!uploadResults || !uploadResultsVideo) {
            console.log(uploadResults, uploadResultsVideo);
            return res.status(400).json({message:"Invalid Credentials all fields are required"});
          }
          const videoUrl = uploadResultsVideo.map((video, idx)=>{
            return video.url
          });
          const imgUrl = uploadResults.map((img, idx)=>{
            return img.url
          });
          console.log(videoUrl, imgUrl);
          
          const latestProjUploaded = await LatestProjModel.create({projectTitle,projectDetails, images:imgUrl, videoUrl:videoUrl});
          return res.status(201).json({latestProjUploaded});
    } catch (error) {
        console.log("There are some errors in your addingNewLatestProjectController plz fix the bug first ", error);
        return res.status(500).json({message:"There are some errors in your addingNewLatestProjectController plz fix the bug first ", error});
    }
}
export const updatePrevLatestProjectController = async (req, res)=>{
    const {projectTitle,projectDetails} = req.body;
    const id = req.params.id;
    try {
        if(!projectTitle || !projectDetails) {
            console.log(projectTitle, videoUrl, projectDetails);
            return res.status(400).json({message:"Invalid Credentials all fields are required"});
        }
        const updatedLatestProj = await LatestProjModel.findByIdAndUpdate(id, {projectTitle,projectDetails});
        return res.status(201).json({updatedLatestProj});
    } catch (error) {
        console.log("There are some errors in your updatePrevLatestProjectController plz fix the bug first ", error);
        return res.status(500).json({message:"There are some errors in your updatePrevLatestProjectController plz fix the bug first ", error}); 
    }
}
export const deletePrevLatestProjectController = async (req, res)=>{
    const id = req.params.id;
    try {
        const deletingLatestProj = await LatestProjModel.findByIdAndDelete(id);
        return res.status(200).json({message:"Project has been successfully deleted"});
    } catch (error) {
        console.log("There are some errors in your deletePrevLatestProjectController plz fix the bug first ", error);
        return res.status(500).json({message:"There are some errors in your deletePrevLatestProjectController plz fix the bug first ", error}); 
    }
}
export const getLatestProjectController = async (req, res)=>{
    console.log("We are in the get latest project controller ");
    
    try {
        const latestProject = await LatestProjModel.find();
        console.log("This is latest project ", latestProject);
        
        return res.status(200).json({latestProject});
    } catch (error) {
        console.log("There are some errors in your deletePrevLatestProjectController plz fix the bug first ", error);
        return res.status(500).json({message:"There are some errors in your deletePrevLatestProjectController plz fix the bug first ", error});  
    }
}
// export const addingAboutUtController = async (req, res)=>{
//     try {
        
//     } catch (error) {
//         console.log("There are some errors in your addingAboutUtController plz fix the bug first ", error);
//         return res.status(500).json({message:"There are some errors in your addingAboutUtController plz fix the bug first ", error}); 
//     }
// }

export const addPostIntoHeroSection = async (req, res)=>{
    const {title, description} = req.body;
    console.log(title, description);
    
    const file = req.file ? req.file.path : null;
    try {
        if(!file) {
            return res.status(400).json({message:"Images is required", img:file});
        }
        const image = await singlePhotoUploadOnCloud(file);
        const uploadedData = await HeroSecModel.create({image, title, description:description});
        return res.status(201).json({uploadedData});
    } catch (error) {
        console.log("There are some errors in your addPostIntoHeroSection ", error);
        return res.status(500).json({message:"There are some errors in your addPostIntoHeroSection ", error});
    }
}
export const getAllHeroSectionDataController = async (req, res)=>{
    try {
        const allHeroData = await HeroSecModel.find();
        return res.status(200).json({allHeroData});
    } catch (error) {
        console.log("There are some errors in your getAllHeroSectionDataController ", error);
        return res.status(500).json({message:"There are some errors in your getAllHeroSectionDataController ", error});
    }
}
export const updateHeroSecDataController = async (req, res)=>{
    const {title, description} = req.body;
    const id = req.params.id;
    try {
        const updatedData = await HeroSecModel.findByIdAndUpdate(id, {title, description});
        return res.status(201).json({updatedData});
    } catch (error) {
        console.log("There are some errors in your updateHeroSecDataController ", error);
        return res.status(500).json({message:"There are some errors in your updateHeroSecDataController ", error});
    }
}
export const deleteHeroSectionData = async (req, res)=>{
    const id = req.params.id;
    try {
        const deletedPost = await HeroSecModel.findByIdAndDelete(id);
        return res.status(201).json({message:"Post Deleted"});
    } catch (error) {
        console.log("There are some errors in your deleteHeroSectionData ", error);
        return res.status(500).json({message:"There are some errors in your deleteHeroSectionData ", error});
    }
}
export const addNewServiceForHeroSection = async (req, res)=>{
    const {serviceName, serviceDetails} = req.body;
    const file = req.file ? req.file.path : null;
    try {
        const imgUrl = await singlePhotoUploadOnCloud(file);
        const uploadedService = await HeroServiceModel.create({serviceName, serviceDetails, serviceImage:imgUrl});
        return res.status(201).json({uploadedService});
    } catch (error) {
        console.log("There are some errors in your addNewServiceForHeroSection ", error);
        return res.status(500).json({message:"There are some errors in your addNewServiceForHeroSection ", error});
    }
}
export const getAllHeroServicesController = async (req, res)=>{
    try {
        const allHeroServices = await HeroServiceModel.find();
        return res.status(200).json({allHeroServices});
    } catch (error) {
        console.log("There are some errors in your getAllHeroServicesController ", error);
        return res.status(500).json({message:"There are some errors in your getAllHeroServicesController ", error});
    }
}