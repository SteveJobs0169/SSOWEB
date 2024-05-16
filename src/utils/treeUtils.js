function buildTree(nodeDict, currentNode, nodeIdKey, childrenName) {
    currentNode[childrenName] = (nodeDict[currentNode[nodeIdKey]] || []).map(childNode =>
        buildTree(nodeDict, childNode, nodeIdKey, childrenName)
    );
    return currentNode;
}

function buildNestedTree(nodeDict, currentNode, nodeIdKey, childrenName) {
    const children = (nodeDict[currentNode[nodeIdKey]] || []).map(childNode =>
        buildNestedTree(nodeDict, childNode, nodeIdKey, childrenName)
    );


    if (children.length > 0) {
        currentNode[childrenName] = children;
    }

    return currentNode;
}

export default function (flatData, NestedTree = false, nodeIdKey = 'id', parentIdKey = 'pid', rootNodePid = null, allowAsRoot = true, childrenName = 'children') {
    const nodeDict = {};
    const nodeDictId = {};

    flatData.forEach(node => {
        nodeDict[node[parentIdKey]] = nodeDict[node[parentIdKey]] || [];
        nodeDict[node[parentIdKey]].push(node);
        nodeDictId[node[nodeIdKey]] = node;
    });

    const rootNodes = flatData.filter(node => {
        const nodeParentId = node[parentIdKey];
        if (nodeParentId === rootNodePid) {
            return true;
        }
        if (allowAsRoot) {
            const parent = nodeDictId[nodeParentId];
            return parent === undefined;
        }
        return false;
    });

    const treeData = rootNodes.map(rootNode => {
        // buildTree(nodeDict, rootNode, nodeIdKey, childrenName)
        if (NestedTree) {
            return buildNestedTree(nodeDict, rootNode, nodeIdKey, childrenName);
        } else {
            return buildTree(nodeDict, rootNode, nodeIdKey, childrenName);
        }
    });

    return treeData;
}