"use client";
//karena menggunakan typscript maka menggunkan syntetic event
import { SyntheticEvent, useState } from "react"
import { useRouter } from "next/navigation";

type Product = {
    id: number;
    title: string;
    price: number;
}

export default function delateProduct(product: Product) {

    const [modal1, setModal] = useState(false);
    const [isMutating, setIsMutating] = useState(false);

    const router = useRouter();

    async function handleDelete(productId: number) {
        setIsMutating(true);
        await fetch(`http://localhost:5000/products/${productId}`, {
            method: 'DELETE'
        });
        setIsMutating(false)

        router.refresh();
        setModal(false)
    }
    function handleChange() {
        setModal(!modal1)
    }
    return (
        <div className="">
            <button onClick={handleChange} className="btn btn-error btn-sm">Delete</button>
            <input type="checkbox" checked={modal1} onChange={handleChange} className="modal-toggle" />

            <div className="modal bg-white">
                <div className="modal-box bg-white">
                    <h3 className="font-bold text-lg">
                        Are you sure to delete this {product.title} ?
                    </h3>

                    <div className=" modal-action">
                        <button type="button" onClick={handleChange} className=" btn">
                            Close
                        </button>
                        {!isMutating ? (
                            <button type="button" onClick={() => handleDelete(product.id)} className=" btn btn-primary">
                                Delate
                            </button>
                        ) : (
                            <button type="button" className=" btn loading">
                                Delating ...
                            </button>
                        )}

                    </div>

                </div>
            </div>
        </div>
    )
}
