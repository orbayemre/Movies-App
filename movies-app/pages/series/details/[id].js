import { useRouter } from 'next/router'

export default function Post({ post }) {
    const router = useRouter()
    if (router.isFallback) {
        return <div>Loading...</div>
    }
    return (
        <div>
            serie - {post}
        </div>
    )
}

export async function getStaticPaths() {
    return {
        paths: [{ params: { id: '1' } }],
        fallback: true,
    }
}

export async function getStaticProps({ params }) {
    const post = params.id;

    return {
        props: { post },
        revalidate: 1,
    }
}
