import { Router } from 'express'
import authRoutes from '../modules/auth/auth.routes'
import bookingRoutes from '../modules/bookings/bookings.routes'
import classesRoutes from '../modules/classes/classes.routes'
import usersRoutes from '../modules/users/users.routes'


const router = Router()

router.use('/auth',authRoutes)
router.use('/classes', classesRoutes)
router.use('/bookings', bookingRoutes)
router.use('/users', usersRoutes)

export default router