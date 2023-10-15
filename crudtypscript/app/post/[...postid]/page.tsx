
export default function postDetail({ params }: { params: { postid: string } }) {
    console.log(params);
    return (
        <div>Post {params.postid[0]}</div>
    )
}
