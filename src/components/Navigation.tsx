import NavigationElement from "./NavigationElement";
import NavigationConfig from "@/settings/navigation.json"

export default function Navigation() {
    return (
        <nav>
            <NavigationElement name={NavigationConfig.element[1].Name} href={NavigationConfig.element[1].href}/>
            <NavigationElement name={NavigationConfig.element[2].Name} href={NavigationConfig.element[2].href}/>
            <NavigationElement name={NavigationConfig.element[3].Name} href={NavigationConfig.element[3].href}/>
        </nav>
    )
}