import Link from "next/link";
import { Chip } from "@nextui-org/react";
import { db } from "@/db";
import paths from "@/paths";

const TopicsList = async () => {
  const topics = await db.topic.findMany();

  const renderTopics = () => {
    return topics.map(topic => (
      <div key={topic.id} className="flex flex-row gap-2">
        <Link href={paths.topicShow(topic.slug)}>
          <Chip color="warning" variant="shadow">
            {topic.slug}
          </Chip>
        </Link>
      </div>
    ));
  };

  return (
    <div>
      <h2>Topics List</h2>
      {renderTopics()}
    </div>
  );
};

export default TopicsList;
