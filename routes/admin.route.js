import { Router } from 'express';
import adminController from '../controllers/admin.controller.js';
import validationAdmin from '../middlewares/validationAdmin.js';
const router = Router();

router.get('/admin', adminController.findAllAdmins);

router.post('/admin', validationAdmin.validationRegisterAdmin ,adminController.registerAdmin)

router.get('/admin/:idAdmin', adminController.findOneAdmin);

router.put('/admin/:idAdmin', validationAdmin.validationUpdateAdmin, adminController.updateAdmin);

router.delete('/admin/:idAdmin', validationAdmin.validateidAdmin, adminController.deleteOneAdmin);

export default router;