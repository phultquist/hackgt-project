import Form from '../components/Form'
import PageWithHeader from '../components/PageWithHeader'

export default function Home() {
  return (
    <PageWithHeader>
      <div className='px-10'>
        <h1 className="text-3xl font-extrabold pt-6 pb-2">
          Good Day Vending
        </h1>
        <p>
        Thank you for reporting this issue. If you provided your email, we will reach out to you soon to help refund your order. The site should be fixed soon. 
        <br /><br />
        If you have any other questions, please contact <a className='hover:underline' href='mailto:support@gdvending.com'>support@gdvending.com</a>.
        </p>
      </div>
    </PageWithHeader>
  )
}
