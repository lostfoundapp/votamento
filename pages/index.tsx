import { NextPage } from 'next';

import Nav from '../components/nav'

const IndexPage: NextPage = () => {
  return (
    <div>
      <Nav />
      <div className="py-80">
        <h1 className="text-5xl text-center text-accent-1">
          Next.js
        </h1>
      </div>
    </div>
  )
}

export default IndexPage;
