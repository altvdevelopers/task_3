//////////////////////////////////////////////////////////////////////////////
/*             Импорт альта и чата для регистрации команд.                  */
//////////////////////////////////////////////////////////////////////////////
import alt from 'alt'
import chat from 'chat'
//////////////////////////////////////////////////////////////////////////////
/*             Импорт альта и чата для регистрации команд.                  */
//////////////////////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////////////////////
/*             Вызов ивентов и регистрация команд с func.                   */
//////////////////////////////////////////////////////////////////////////////
alt.on('playerConnect', spawnPlayer);

alt.onClient('upgradeEngine:Install', Install)

chat.registerCmd('engineCEF', upgradeEngine)

chat.registerCmd('vehCEF', spawnVeh)
//////////////////////////////////////////////////////////////////////////////
/*             Вызов ивентов и регистрация команд с func.                   */
//////////////////////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////////////////////
/*     Функции. Занес в них для личного удобства. Надеюсь решение верное.   */
//////////////////////////////////////////////////////////////////////////////
function spawnPlayer(player) {
    const spawnPos = {
        x: -2639.872,
        y: 1866.812,
        z: 160.135
    }
    player.model = 'mp_m_freemode_01'
    player.spawn(spawnPos.x,spawnPos.y,spawnPos.z, 5000)
}

function spawnVeh(player,arg) {
    if(!arg || arg.length <= 0) {
        chat.send(player, '/veh (model)')
        return
    }

    try {
        new alt.Vehicle(arg[0], player.pos.x+3, player.pos.y, player.pos.z, 0, 0, 0)    
    }catch(e) {
       alt.log(e.stack)
    }
}

function upgradeEngine(player) {
    if(player.vehicle == null) return chat.send(player, 'Вы не находитесь в машине.')
    alt.emitClient(player, 'upgradeEngine:Start')
}

function Install(player, data) {
    let upgData = JSON.parse(data)
    let pveh = player.vehicle
    pveh.modKit = 1
    pveh.setMod(11, upgData.upgradeLevel)
    alt.log(pveh.getMod(11))
    chat.send(player, `Вы успешно изменили двигатель на ${upgData.upgradeLevel}`)
    alt.emitClient(player, 'upgradeEngine:Close')
    return
}

//////////////////////////////////////////////////////////////////////////////
/*     Функции. Занес в них для личного удобства. Надеюсь решение верное.   */
//////////////////////////////////////////////////////////////////////////////
