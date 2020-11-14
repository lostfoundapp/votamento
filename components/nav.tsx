import { NextComponentType } from 'next';
import { GrInstagram } from 'react-icons/gr';

const Nav: NextComponentType = () => {
  return (
    <nav className="nav">
      <h2 className="leozito">Leozito Rocha</h2>
      <h1 className="votamento-css">Faça agora seu votamento</h1>
      <a href="https://www.instagram.com/leozitorochaoficial/" target="_blank" className="rede">
        <GrInstagram color="#f50a7b" size={30} title="Instagram" />
      </a>
    </nav>
  )
}
export default Nav;
