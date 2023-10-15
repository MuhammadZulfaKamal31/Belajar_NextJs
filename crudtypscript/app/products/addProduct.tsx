"use client";
//karena menggunakan typscript maka menggunkan syntetic event
import { SyntheticEvent, useState } from "react"
import { useRouter } from "next/navigation";


export default function addProduct() {
    const [title, setTitle] = useState("")
    const [price, setPrice] = useState("")
    const [modal1, setModal] = useState(false);
    const [isMutating, setIsMutating] = useState(false);

    const router = useRouter();

    async function handleSubmit(e: SyntheticEvent) {
        e.preventDefault();
        setIsMutating(true);
        await fetch('http://localhost:5000/products', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                title: title,
                price: price,
            })
        });
        setIsMutating(false)

        setTitle("");
        setPrice("");
        router.refresh();
        setModal(false)
    }
    function handleChange() {
        setModal(!modal1)
    }
    return (
        <div className="">
            <button onClick={handleChange} className="btn"> Add New</button>
            <input type="checkbox" checked={modal1} onChange={handleChange} className="modal-toggle" />

            <div className="modal bg-white">
                <div className="modal-box bg-white">
                    <h3 className="font-bold text-lg">
                        Add New Product
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
                            <input type="text" value={price} onChange={(e) => setPrice(e.target.value)} className=" input w-full input-bordered bg-white"
                                placeholder="Price" />
                        </div>
                        <div className=" modal-action">
                            <button type="button" onClick={handleChange} className=" btn">
                                Close
                            </button>
                            {!isMutating ? (
                                <button type="submit" className=" btn btn-primary">
                                    Save
                                </button>
                            ) : (
                                <button type="button" className=" btn loading">
                                    Saving...
                                </button>
                            )}

                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}
