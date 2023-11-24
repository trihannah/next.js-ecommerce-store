import Link from 'next/link';
import style from './page.module.css';

export default function ProductsPage() {
  const products = [
    {
      id: '1',
      name: 'Product 1',
      imageSrc: '/images/Augarten_Teeservice.jpg',
    },
    {
      id: '2',
      name: 'Product 2',
      imageSrc: '/images/Bluemchenservice.jpg',
    },
    {
      id: '3',
      name: 'Product 3',
      imageSrc: '/images/bohemianglasses.jpg',
    },
    {
      id: '4',
      name: 'Product 4',
      imageSrc: '/images/BPlutzer.jpg',
    },
    {
      id: '5',
      name: 'Product 5',
      imageSrc: '/images/geschlifferne Gläser.jpg',
    },
    {
      id: '6',
      name: 'Product 6',
      imageSrc: '/images/Gläseset braungrün.jpg',
    },
    {
      id: '7',
      name: 'Product 7',
      imageSrc: '/images/Keramikkrug weiß.jpg',
    },
    {
      id: '8',
      name: 'Product 8',
      imageSrc: '/images/Keramkik Mostkrug blaue Verzierung 40.jpg',
    },
    {
      id: '9',
      name: 'Product 9',
      imageSrc: '/images/Mokkaservice Goldrand.jpg',
    },
    {
      id: '10',
      name: 'Product 10',
      imageSrc: '/images/Mostkrug1.jpg',
    },
    {
      id: '11',
      name: 'Product 11',
      imageSrc: '/images/Wasserkrug Jugendstil.jpg',
    },
    {
      id: '12',
      name: 'Product 12',
      imageSrc: '/images/Wasserkrug rot.jpg',
    },
  ];

  return (
    <div className={style.pageWrapper}>
      <div className={style.heroSection}>
        <h1 className={style.h1}>All products</h1>
      </div>
      <main className={style.productGrid}>
        {products.map((product) => (
          <Link
            href={`/products/${product.id}`}
            key={`product-${product.id}`}
            data-test-id={`product-${product.id}`}
          >
            <div>
              <img
                src={product.imageSrc}
                alt={`Product: ${product.name}`}
                className={style.productImage}
              />
              <p>{product.name}</p>
            </div>
          </Link>
        ))}
      </main>
      <Link href="/products" data-test-id="products-link">
        Back to Products
      </Link>
    </div>
  );
}
