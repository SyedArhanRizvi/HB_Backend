import express from "express";
import { upload } from "../Middlewares/multer.uploads.js";
import { addingNewDesigningServicesController, addingNewFurnitureServiceController, addingNewInteriorServiceController, addingNewLatestProjectController, addingNewMarqueSentencesController, addingNewModuloKitchenServiceController, addingNewProjectController, addingNewSofaProjectController, addingNewVideoController, addingSliderObjController, addNewServiceForHeroSection, addPostIntoHeroSection, deleteHeroSectionData, deletePrevDesignController, deletePrevFurnitureServiceController, deletePrevLatestProjectController, deletePrevSliderObj, deletePrevVideoController, deletingInteriorProjectController, deletingPrevMarqueSentencesController, deletingPrevModuloKitchenServiceController, getAllDesignController, getAllFurnitureServiceController, getAllHeroSectionDataController, getAllHeroServicesController, getAllInteriorServicesProjects, getAllModuloKitchenServiceController, getAllSliderImg, getAllSofaProjects, getAllUploadedProjects, getAllVideoController, getLatestProjectController, getMarqueSentencesController, projectDeletingController, projectDetailsUpdatingController, sofaDeletingController, updateHeroSecDataController, UpdatePrevFurnitureServiceController, updatePrevInteriorServiceController, updatePrevLatestProjectController, updatePrevVideoController, updateSliderPrevObj, updateSofaProjectDetails, updatingPrevDesigningServices, updatingPrevMarqueSentencesController, updatingPrevModuloKitchenServiceController } from "../Controllers/service.Controller.js";
import { singleUpload } from "../Middlewares/single.multer.js";

const servicesRoutes = express.Router();

// For User Project Section ::
servicesRoutes.post("/add-new-projects", upload, addingNewProjectController);
servicesRoutes.put("/update-prev-project-details/:id", projectDetailsUpdatingController);
servicesRoutes.post("/delete-one-project/:id", projectDeletingController);
servicesRoutes.get("/get-all-projects", getAllUploadedProjects);

// For User Sofa Services Section ::
servicesRoutes.post("/add-new-sofa-project", upload, addingNewSofaProjectController);
servicesRoutes.put("/update-prev-sofa-work-details/:id", updateSofaProjectDetails);
servicesRoutes.post("/delete-sofa-project/:id", sofaDeletingController);
servicesRoutes.get("/get-all-sofa-projects", getAllSofaProjects);

// For User Interior Services Section ::
servicesRoutes.post("/add-new-interior-service", upload, addingNewInteriorServiceController);
servicesRoutes.put("/update-prev-interior-service/:id", updatePrevInteriorServiceController);
servicesRoutes.post("/deleting-prev-interior-service/:id", deletingInteriorProjectController);
servicesRoutes.get("/get-all-interior-service", getAllInteriorServicesProjects);

// For User Designing Services Section ::
servicesRoutes.post("/add-new-designing-service", upload, addingNewDesigningServicesController);
servicesRoutes.put("/update-prev-designing-service/:id", updatingPrevDesigningServices);
servicesRoutes.post("/delete-prev-designing-service/:id", deletePrevDesignController);
servicesRoutes.get("/get-all-designing-service", getAllDesignController);

// For User Furniture Services Section ::
servicesRoutes.post("/add-new-furniture-services", upload, addingNewFurnitureServiceController);
servicesRoutes.put("/update-prev-furniture-services/:id", UpdatePrevFurnitureServiceController);
servicesRoutes.post("/delete-prev-furniture-services/:id", deletePrevFurnitureServiceController);
servicesRoutes.get("/get-all-furniture-services", getAllFurnitureServiceController);

// For User Modulo Kitchen Services Section ::
servicesRoutes.post("/add-new-modulo-kitchen", upload, addingNewModuloKitchenServiceController);
servicesRoutes.put("/update-prev-modulo-kitchen/:id", updatingPrevModuloKitchenServiceController);
servicesRoutes.post("/deleting-prev-modulo-kitchen/:id", deletingPrevModuloKitchenServiceController);
servicesRoutes.get("/get-all-modulo-kitchen-projects", getAllModuloKitchenServiceController);


// For Manage User Webpage details Section ::

/* ---------------------> Sliding Challenges <------------------------ */
servicesRoutes.post("/add-new-sliderObj", singleUpload.single("url"), addingSliderObjController);
servicesRoutes.put("/update-prev-sliderObj/:id", updateSliderPrevObj);
servicesRoutes.delete("/delete-prev-sliderObj/:id", deletePrevSliderObj);
servicesRoutes.get("/get-all-sliderObj", getAllSliderImg);

/* -------------------> Service Videos Handler <--------------------- */
servicesRoutes.post("/add-new-video-project", addingNewVideoController);
servicesRoutes.put("/update-prev-video-project/:id", updatePrevVideoController);
servicesRoutes.post("/delete-prev-video-project/:id", deletePrevVideoController);
servicesRoutes.post("/get-all-video-project", getAllVideoController);

/* ------------------> Marque Sentence Handler <----------------------- */ 
servicesRoutes.post("/add-new-marque-sentences", upload, addingNewMarqueSentencesController);
servicesRoutes.put("/update-prev-marque-sentences/:id",updatingPrevMarqueSentencesController);
servicesRoutes.delete("/delete-prev-marque-sentences/:id",deletingPrevMarqueSentencesController);
servicesRoutes.get("/get-marque-sentences", getMarqueSentencesController);

/* ------------------> Latest Project Handler <-------------------------- */ 
servicesRoutes.post("/add-new-latest-project", upload, addingNewLatestProjectController);
servicesRoutes.put("/update-prev-latest-project/:id",updatePrevLatestProjectController);
servicesRoutes.delete("/delete-prev-latest-project/:id",deletePrevLatestProjectController);
servicesRoutes.get("/get-latest-project", getLatestProjectController);

/* ------------------> Edit Hero Section <---------------------------------- */
servicesRoutes.post("/add-new-item-inHero-section", singleUpload.single("image"), addPostIntoHeroSection);
servicesRoutes.get("/get-all-heroSec-data", getAllHeroSectionDataController);
servicesRoutes.put("/update-some-details-inHero-Sec-data/:id", updateHeroSecDataController);
servicesRoutes.post("/delete-hero-sec-dat/:id", deleteHeroSectionData);


/* --------------------> Post Services for hero section <--------------------- */
servicesRoutes.post("/add-new-service-for-heroSection", singleUpload.single("image"), addNewServiceForHeroSection);
servicesRoutes.get("/get-all-hero-services", getAllHeroServicesController);


/* ------------------> About User Details Controller <---------------------- */
// servicesRoutes.post("/adding-about-us", singleUpload, addingAboutUtController);
// servicesRoutes.put("/updating-about-us", addingAboutUtController);
// // servicesRoutes.delete;("/adding-about-us", addingAboutUtController);
// servicesRoutes.get("/get-about-us", addingAboutUtController);

export default servicesRoutes;