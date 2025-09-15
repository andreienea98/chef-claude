import chefClaudeLogo from "./assets/chef-claude-icon.png"

export default function Header() {
  function handleClick() {
    window.location.reload()
  }
  return (
    <header>
      <img onClick={handleClick} src={chefClaudeLogo} style={{cursor: "pointer"}}/>
      <h1>Chef Claude</h1>
    </header>
  )
}
