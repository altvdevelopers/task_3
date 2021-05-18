import alt from 'alt'
import chat from 'chat'

const spawnPos = {
    x: -2639.872,
    y: 1866.812,
    z: 160.135
}
chat.registerCmd('engine', upgradeZentorno)

function upgradeZentorno(player, arg) {
    let pveh = player.vehicle
    if(pveh === null) {
        chat.send(player, 'Вы не находитель в автомобиле.')
        return
    }
    if(!arg || isNaN(arg[0])) {
        chat.send(player, 'Введите корректные данные.')
        return
    } 
    if(arg[0] < 0 || arg[0] > 4 || arg.length > 1) {
        chat.send(player, 'Введите число в интервале от 0 до 4')
        return
    }
    pveh.modKit = 1
    pveh.setMod(11, arg[0])
    alt.log(pveh.getMod(11))
    chat.send(player, `Вы успешно изменили двигатель на ${arg[0]}`)
    return
}

chat.registerCmd('vehCommands', (player,arg) => {
    if(!arg || arg.length <= 0) {
        chat.send(player, '/veh (model)')
        return
    }

    try {
        new alt.Vehicle(arg[0], player.pos.x+3, player.pos.y, player.pos.z, 0, 0, 0)    
    }catch(e) {
       alt.log(e.stack)
    }
})
alt.on('playerConnect', (player) => {
    player.model = 'mp_m_freemode_01'
    player.spawn(spawnPos.x,spawnPos.y,spawnPos.z, 5000)
});
