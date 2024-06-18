import {Link} from "react-router-dom";
import {Button} from "@/components/ui/button.tsx";

export default function NotFoundPage() {
    return (
        <div>
            <h1>Not found 404</h1>
            <Link to="/">{<Button>Back to Home</Button>}</Link>
        </div>
    )
}