const ControlButton = props => {
    return (
        <div>
            <input type='button' value='發送訊息給 server 後回傳 client' onClick={() => { props.sendMessage('onlyCatch') }} />
            <input type='button' value='發送訊息給 server 後回傳給所有連結的 client' onClick={() => { props.sendMessage('allCatch') }} />
            <input type='button' value='發送訊息給 server 後回傳給除了自己外所有連結的 client' onClick={() => { props.sendMessage('lessCatch') }} />
            <input type='button' value='發送訊息給 server 後回傳給相同房間的 client' onClick={() => { props.sendMessage('roomCatch') }} />
        </div>
    )
}
export default ControlButton;