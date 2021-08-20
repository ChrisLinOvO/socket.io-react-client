const ConnectBlock = props => {

    const roomData = [{ id: 'room_1', name: '房間一' }, { id: 'room_2', name: '房間二' }]

    const getRoomName = () => {
        let targetIndex = roomData.findIndex(room => {
            return room.id === props.room
        })

        return roomData[targetIndex].name
    }

    let roomOption = roomData.map(room => {
        return <option value={room.id} key={room.id}>
            {room.name}
        </option>
    })

    return (
        <div>
            <select value={props.room}
                onChange={props.setRoom}
                disabled={props.socket ? true : false}
                >
                {roomOption}
            </select>
            <input type='button'
                value={props.socket ? '關閉 WebSocket 連結' : '連線至 WebSocket'}
                onClick={props.socket ? props.closeConnect : props.openConnect} />
            <span>{props.socket ? `已連線至${getRoomName()}` : '未連線'}</span>
        </div>
    )
}
export default ConnectBlock;