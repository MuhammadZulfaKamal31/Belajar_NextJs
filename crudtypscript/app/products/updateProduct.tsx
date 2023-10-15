"use client";
//karena menggunakan typscript maka menggunkan syntetic event
import { SyntheticEvent, useState } from "react"
import { useRouter } from "next/navigation";

type Product = {
    id: number;
    title: string;
    price: number
}

export default function updateProduct(product: Product) {
    const [title, setTitle] = useState(product.title)
    const [price, setPrice] = useState(product.price)
    const [modal1, setModal] = useState(false);
    const [isMutating, setIsMutating] = useState(false);

    const router = useRouter();

    async function handleSubmit(e: SyntheticEvent) {
        e.preventDefault();
        setIsMutating(true);
        await fetch(`http://localhost:5000/products/${product.id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                title: title,
                price: price,
            })
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
            <button onClick={handleChange} className="btn btn-info btn-sm">
                Edit
            </button>
            <input type="checkbox" checked={modal1} onChange={handleChange} className="modal-toggle" />
            <div className="modal bg-white">
                <div className="modal-box bg-white">
                    <h3 className="font-bold text-lg">
                        Edit {product.title}
                    </h3>
                    <form onSubmit={handleSubmit} action="" className="">
                        <div className=" form-control">
                            <label className=" label font-bold">Title</label>
                            <input value={title}
                                onChange={(e) => setTitle(e.target.value)} type="text" className=" input w-full input-bordered bg-white"
                                placeholder=" Product Name" />
                        </div>
                        <div className=" form-control">
                            <label className=" label font-bold
                            ">Price</label>
                            <input type="text" value={price} onChange={(e) => setPrice(Number(e.target.value))} className=" input w-full input-bordered bg-white"
                                placeholder="Price" />
                        </div>
                        <div className=" modal-action">
                            <button type="button" onClick={handleChange} className=" btn">
                                Close
                            </button>
                            {!isMutating ? (
                                <button type="submit" className=" btn btn-primary">
                                    Update
                                </button>
                            ) : (
                                <button type="button" className=" btn loading">
                                    Updating...
                                </button>
                            )}

                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}
