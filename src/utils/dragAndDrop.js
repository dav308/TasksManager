function getforSection(id, arr){
    const myId = parseInt(id)
    const section = arr.find((elem)=>{
        return elem.id == myId
    })

    const {tasksInSections, orders} = section

    return [section, tasksInSections, orders]
}

const reorder = (arr, origin, destination) => {
    const result = [...arr]
    const [removed] = result.splice(origin, 1)
    result.splice(destination, 0, removed)
  
    return result
  }
  

export {getforSection, reorder}