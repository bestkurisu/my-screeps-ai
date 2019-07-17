const defaultPath = require('moveSetting').defaultPath
const { creepsConfig } = require('config')

// 去资源点挖矿
const harvestEngry = (creep) => {
    // 从 creep 内存中读取目标资源点
    let target = Game.getObjectById(creep.memory.targetSourceId)
    // 如果目标不存在就尝试重新获取资源点
    if (!target) {
        const closestSource = creep.pos.findClosestByPath(FIND_SOURCES)
        // 如果有可用资源点，就存进内存
        if (closestSource) {
            creep.memory.targetSourceId = closestSource.id
            target = closestSource
        }
    }
    // 挖掘实现
    if (creep.harvest(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
        creep.moveTo(target, defaultPath)
    }
}

// 状态更新
const updateState = (creep, workingMsg) => {
    if(creep.carry.energy <= 0  && creep.memory.working) {
        creep.memory.working = false
        creep.say('⚡ 挖矿')

        const targetSource = creep.pos.findClosestByPath(FIND_SOURCES)
        if (targetSource) creep.memory.targetSourceId = targetSource.id
    }
    if(creep.carry.energy >= creep.carryCapacity && !creep.memory.working) {
        creep.memory.working = true
        creep.say(workingMsg)
    }

    return creep.memory.working
}


module.exports = {
    harvestEngry,
    updateState
}