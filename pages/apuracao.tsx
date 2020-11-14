import { NextPage } from 'next';
import useSWR from 'swr';

import api from '../utils/api';

const Apuracao: NextPage = () => {
    const { data, error } = useSWR(`/api/politico`, api);

    if (error) {
       console.log(error) 
    }
    if (data) {
        console.log(data) 
    }
  return (
    <div>
      <div className="py-80">
        <h1 className="text-5xl text-center text-accent-1">
        Apuracao
        </h1>
      </div>
    </div>
  )
}

export default Apuracao;
