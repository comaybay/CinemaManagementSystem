import '../Web/style.css'
import '../styles/globals.css'
import Header from './components/Header'
import Footer from './components/Footer'

function MyApp({ Component, pageProps }) {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="grow min-h-[400px]">
        <Component {...pageProps} />
      </div>
      <Footer />
    </div>
  )
}

export default MyApp
