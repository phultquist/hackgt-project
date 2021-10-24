import '../styles/globals.css';
import SideBar from '../components/SideBar';
import { withRouter } from 'next/router';

function MyApp({ Component, pageProps, router }) {
  return (<div className='flex flex-row'>
    <div className=''>
      <SideBar currentPage={router.pathname} />
    </div>
    <div className='container p-10 overflow-scroll'>
      < Component {...pageProps} />
    </div>
  </div>)
}

export default withRouter(MyApp)

// export default MyApp
