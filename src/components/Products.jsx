import Product from "./Product";

export default function Products({ products, showRemove = false }) {
    return (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {products.map((product) => (
                <Product key={product.id} product={product} showRemove={showRemove} />
            ))}
        </div>
    );
}
