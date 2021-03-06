import { stayService } from "../services/stay.service"
import { utilService } from "../services/util.service"
import { OrderStatusModal } from '../cmps/order-status-modal'
import { useState } from 'react'

export const OrderPreview = ({ order }) => {

    const [isOpenModal, setIsOpenModal] = useState(false)

    const onOpenModal = () => {
        setIsOpenModal(true)
    }

    const closeModal = () => {
        setIsOpenModal(false)
    }

    const getStatusColor = (status) => {
        let className
        if (status === 'pending') {
            className = 'black'
        } else if (status === 'approved') {
            className = 'green'
        } else {
            className = 'red'
        }
        return className
    }

    return <tr className="order-preview">
        <td>{order.orderNum}</td>
        <td>{utilService.changeDateFormat(order.startDate)}</td>
        <td>{utilService.datesDiff(order.startDate, order.endDate)}</td>
        <td>{(order.booker.fullname)}</td>
        <td>{order.stay}</td>
        <td>{stayService.getTotalGuestCount(order.guests)}</td>
        <td className={getStatusColor(order.status)} onClick={onOpenModal}>{order.status}</td>
        <td>${(order.total).toLocaleString('en-IN', { maximumFractionDigits: 0 })}</td>
        {isOpenModal && <OrderStatusModal closeModal={closeModal} order={order} />}
    </tr>

}