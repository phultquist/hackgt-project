import Form from '../components/Form'
import PageWithHeader from '../components/PageWithHeader'

export default function Home({ stores, catalog }) {
  return (
    <PageWithHeader>
      <div className='px-10'>
        <h1 className="text-3xl font-extrabold pt-6 pb-2">
          Good Day Vending
        </h1>
        <p>
          We’re sorry to hear something went wrong. Help us fix it by filing a report.
        </p>
        <Form stores={stores} products={catalog} />
      </div>
    </PageWithHeader>
  )
}


export async function getServerSideProps() {

  const [locationRes, catalogRes] = await Promise.all([fetch(`http://localhost:5000/locations`), fetch('http://localhost:5000/catalog')]);
  const [locationData, catalogData] = await Promise.all([locationRes.json(), catalogRes.json()]);

  // if (!locationData) {
  //   return {
  //     notFound: true
  //   }
  // }

  return {
    props: {
      stores: locationData,
      catalog: catalogData
    }
  }
}