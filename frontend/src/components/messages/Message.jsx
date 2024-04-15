const Message = () => {
  return (
    <div className="chat chat-end">
      <div className="chat-image avatar">
        <div className="w-10 rounded-full">
          <img src="" alt="chat" />
        </div>
      </div>
      <div className={`chat-bubble text-white bg-yellow-600`}>
        Hi! {"what's"} up?
      </div>
      <div className="chat-footer opacity-50 text-xs flex gap-1 item-center">
        12:00
      </div>
    </div>
  )
}
export default Message