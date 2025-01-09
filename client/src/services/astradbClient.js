export const processAndStoreData = async () => {
  try {
    const data = JSON.parse(localStorage.getItem('instagramData') || '[]');
    const username = localStorage.getItem('username');

    const results = await Promise.all(data.map(async (post) => {
      const processedPost = {
        username: username,
        postId: post.code,
        mediaType: post.media_type,
        likes: post.like_count.toString(),
        comments: post.comment_count.toString(),
        views: post.view_count?.toString() || "0",
        takenAt: post.taken_at
      };

      const astraCommand = {
        insertOne: {
          document: processedPost
        }
      };

      const response = await fetch('https://arch-angels-iserver.vercel.app/api/astra', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          data: astraCommand,
          token: 'AstraCS:BiqicRjjJnuozbugGSXCEvte:c9c47770737cf6d5eaccba38b21874699c164c3bebc28ab32af6730afcb26ec4',
          endpoint: 'https://b0db8dba-e3e3-4574-86ea-a91003cb8cc4-us-east-2.apps.astra.datastax.com/api/json/v1/default_keyspace/nauf'
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error('AstraDB Error:', errorData);
        throw new Error(errorData.message || 'Failed to store data');
      }
      
      const responseData = await response.json();
      console.log('Insert response:', responseData);
      return responseData;
    }));

    return { success: true, insertedCount: results.length, results };
  } catch (error) {
    console.error('Processing Error:', error);
    return { success: false, error: error.message };
  }
};