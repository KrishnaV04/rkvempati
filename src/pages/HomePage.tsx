import { getHomeContent } from "../lib/content";
import MarkdownRenderer from "../components/MarkdownRenderer";
import Diglett from "../components/Diglett";

export default function HomePage() {
  const { body, folder } = getHomeContent();

  return (
    <div className="home-page">
      <MarkdownRenderer content={body} folder={folder} />
      <Diglett />
    </div>
  );
}
