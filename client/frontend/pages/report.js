import Form from '../components/Form'
import PageWithHeader from '../components/PageWithHeader'
import { useRouter } from 'next/router'

export default function Home({ stores, catalog }) {
  const router = useRouter();

  return (
    <PageWithHeader>
      <div className='px-10'>
        <h1 className="text-3xl font-extrabold pt-6 pb-2">
          Good Day Vending
        </h1>
        <p>
          We’re sorry to hear something went wrong. Help us fix it by filing a report.
        </p>
        <Form
          stores={stores}
          products={catalog}
          onSubmit={async (data) => {
            console.log(data);
            try {
              const res = await fetch(
                'http://localhost:5000/problem',
                {
                  body: JSON.stringify(data),
                  headers: {
                    'Content-Type': 'application/json'
                  },
                  method: 'POST'
                }
              )
              router.push('/thanks');
            } catch(e) {
              console.log(e);
              alert("Something went wrong")
            }
          }}
        />
      </div>
    </PageWithHeader>
  )
}


export async function getServerSideProps() {

  const [locationRes, catalogRes] = await Promise.all([fetch(`http://localhost:5000/locations`), fetch('http://localhost:5000/catalog')]);
  const [locationData, catalogData] = await Promise.all([locationRes.json(), catalogRes.json()]);

  return {
    props: {
      stores: locationData,
      catalog: catalogData
    }
  }
}