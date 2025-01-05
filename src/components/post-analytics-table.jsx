export const PostAnalyticsTable = ({ posts, onRowClick }) => {
    return (
      <div className="overflow-x-auto">
        <table className="table table-zebra w-full">
          <thead>
            <tr>
              <th>Title</th>
              <th>Platform</th>
              <th>Engagement</th>
              <th>Reach</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {posts.map((post) => (
              <tr 
                key={post.id} 
                className="hover:bg-base-300 cursor-pointer"
                onClick={() => onRowClick(post)}
              >
                <td>{post.title}</td>
                <td>{post.platform}</td>
                <td>{post.engagement}%</td>
                <td>{post.reach.toLocaleString()}</td>
                <td>{new Date(post.date).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };
  
  