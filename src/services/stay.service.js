import { storageService } from './async-storage.service.js'
import { utilService } from './util.service.js'
// import { userService } from './user.service.js'
import { httpService } from './http.service.js'
const STORAGE_KEY = 'stay'

export const stayService = {
    query,
    getById,
    save,
    remove,
    addReview,
    getTotalGuestCount,
    getTotalReviewScore
}

// async function query(filterBy) {
//     // console.log('from stay.service', { filterBy })

//     let stays = await storageService.query(STORAGE_KEY)
//     // console.log('from stay.service.query', { stays })

//     if (filterBy.type.length > 0) {
//         stays = stays.filter(stay =>
//             filterBy.type.includes(stay.type))
//     }
//     if (filterBy.amenities.length > 0) {
//         stays = stays.filter(stay =>
//             filterBy.amenities.every(amenity => { return stay.amenities.includes(amenity) }))
//     }

//     if (filterBy.price) {
//         stays = stays.filter(stay => stay.price >= filterBy.price)
//     }
//     if (filterBy.label) {
//         // stays = stays.filter(stay => filterBy.label.includes(stay.labels))
//         stays = stays.filter(stay => {
//             // console.log(stay.labels)
//             return stay.labels.includes(filterBy.label)
//         })
//     }
//     return stays

//     // return storageService.query(STORAGE_KEY)
//     // return axios.get(`/api/stay`)
//     // await httpService.get(`stay/`)
// }

async function query() {
    let stays = await httpService.get('stay')
    return stays
}

async function getById(stayId) {
    // return storageService.get(STORAGE_KEY, stayId)
    let stay = await httpService.get(`stay/${stayId}`)
    return stay
}


async function remove(stayId) {
    await storageService.remove(STORAGE_KEY, stayId)
    // return axios.delete(`/api/stay/${stayId}`)
    // await httpService.delete(`review/${reviewId}`)
}

async function save(stay) {
    var savedStay
    if (stay._id) {
        savedStay = await storageService.put(STORAGE_KEY, stay)

    } else {
        // stay.owner = userService.getLoggedinUser()
        savedStay = await storageService.post(STORAGE_KEY, stay)
    }
    return savedStay
}


async function addReview(txt, stay) {
    console.log('addreview')
    const review = { id: utilService.makeId(), txt, date: 'March 2022', by: { _id: '622f3407e36c59e6164fbe6a', fullname: 'Mike', imgUrl: 'https://randomuser.me/portraits/men/69.jpg' } }
    stay.reviews.push(review)
    const savedStay = save(stay)
    return savedStay
}

function getTotalGuestCount(guestCount) {
    // const totalCount = guestCount.adult + guestCount.children + guestCount.infant
    // return totalCount
    let totalGuests = 0
    for (let value in guestCount) {
        totalGuests += guestCount[value]
    }
    return totalGuests
}

function getTotalReviewScore(reviewScores) {
    let totalScores = 0
    for (let value in reviewScores) {
        totalScores += reviewScores[value]
    }
    totalScores = totalScores / Object.keys(reviewScores).length
    // const totalScores = ((reviewScores.accuracy + reviewScores.cleanliness +
    //     reviewScores.communication + reviewScores.checkin + reviewScores.location + reviewScores.value) / Object.keys(reviewScores).length).toFixed(1)
    return totalScores.toFixed(1)
}