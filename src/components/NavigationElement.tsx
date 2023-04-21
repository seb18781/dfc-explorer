import Link from "next/link"

interface NavigationElementI{
    name: string
    href: string
}
export default function NavigationElement(props: NavigationElementI){
    return(
        <>
            <Link href={props.href}> {props.name} </Link>
        </>
    )
}