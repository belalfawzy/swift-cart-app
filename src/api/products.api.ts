export default async function getProducts() {
  const res = await fetch(`https://ecommerce.routemisr.com/api/v1/products`, {
    method : 'GET',
    // cache : "force-cache" // SSG
    // cache : "no-store" // SSR
    next : {revalidate : 60} // ISR
  }); 
  const { data } = await res.json();

  return data;
}