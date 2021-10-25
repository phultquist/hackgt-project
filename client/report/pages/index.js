import Form from '../components/Form'
import PageWithHeader from '../components/PageWithHeader'
import { useRouter } from 'next/router'

export default function Home({ stores, catalog }) {
  const router = useRouter();

  return (
    <PageWithHeader>
      <div className='px-10'>
        <h1 className="text-3xl font-extrabold pt-6 pb-2">
          Creator Restaurants
        </h1>
        <p>
          We’re sorry to hear something went wrong. Help us fix it by filing a report.
        </p>
        <Form
          stores={stores}
          products={catalog}
          onSubmit={async (data) => {
            console.log("hellO!");
            console.log(data);
            try {
              const res = await fetch(
                `https://hackgt-project-330002.wl.r.appspot.com/problem/`,
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
  console.log(process.env);
  const [locationRes, catalogRes] = await Promise.all([fetch(`${process.env.SERVER_HOST}/locations`), fetch(`${process.env.SERVER_HOST}/catalog`)]);
  const [locationData, catalogData] = await Promise.all([locationRes.json(), catalogRes.json()]);

  return {
    props: {
      stores: locationData,
      catalog: catalogData
    }
  }
}