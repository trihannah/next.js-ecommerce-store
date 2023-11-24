import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getProductById } from '../../../database/products';
import style from './page.modules.css';
import ProductQuantity from './productQuantity';

type Props = {
  params: {
    productId: string;
  };
};

export default async function ProductPage(props: Props) {
  const rawProductId = props.params.productId;

  // Ensure that productId is numeric
  const productId = Number(rawProductId);
  if (isNaN(productId)) {
    return notFound();
  }

  const product = await getProductById(productId);

  if (!product) {
    return notFound();
  }

  const price = parseFloat(product.price);

  return (
    <div className={style.Content}>
      <div className={style.productImageWrapper}>
        <img
          className={style['product-image']}
          src={product.imageUrl || '/default-product-image.jpg'}
          alt={`Product: ${product.name}`}
          data-test-id="product-image"
        />
      </div>
      <div className={style.productDetailsWrapper}>
        <h1>{product.name}</h1>
        <p data-test-id="product-price">${price.toFixed(2)}</p>
        <ProductQuantity product={product} />
        <div>
          <Link href="/Cart">Go to Cart</Link>
        </div>
        <Link href="/products">Back to Products</Link>
      </div>
    </div>
  );
}
