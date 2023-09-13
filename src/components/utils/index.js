function convertToTreeData(data){
  const map = new Map()
  data.forEach((item) => {
    map.set(item.id, item)
    item.children = []
    item.parent = null
  })
  return data.reduce((treeData, item) => {
    if (item.rid) {
      const parent = map.get(item.rid)
      if (parent) {
        item.parent = { ...parent }
        parent.children.push(item)
      }
    } else {
      treeData.push(item)
      calculateChildrenCount(item)
    }
    return treeData
  }, [])
  function calculateChildrenCount(node) {
    let childCount = 0
    node.children.forEach((child) => {
      calculateChildrenCount(child)
      childCount += (child.num || 0) + 1
    })
    node.num = childCount
  }
}
export default convertToTreeData
