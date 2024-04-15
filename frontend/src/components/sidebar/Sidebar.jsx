import Conversations from "./Conversations"
import SearchInput from "./SearchInput"

const Sidebar = () => {
  return (
    <div>
        <SearchInput />
        <div className="divider px-3 divider-warning"></div>
        <Conversations />
        {/* <LogoutButton /> */}
    </div>
  )
}
export default Sidebar