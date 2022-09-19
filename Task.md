<div  id="tg-sb-content">
            <div >
   <h1 >Course Assignment</h1>
</div>

<div>

<div id="toc"> <ul><li><a href="#goal">Goal</a><a    href="#goal" ></a></li><li><a href="#brief">Brief</a><a    href="#brief" ></a><ul><li><a href="#required-features">Required Features</a><a    href="#required-features" ></a></li><li><a href="#additional-features">Additional Features</a><a    href="#additional-features" ></a></li><li><a href="#team-work">Team Work:</a><a    href="#team-work" ></a></li></ul></li><li><a href="#development-process">Development Process:</a><a    href="#development-process" ></a></li><li><a href="#restrictions">Restrictions</a><a    href="#restrictions" ></a></li><li><a href="#resources">Resources</a><a    href="#resources" ></a></li></ul></div>

   <h2 id="goal" >Goal<a    href="#goal" ></a></h2><i > </i>

<p>To apply knowledge of JavaScript techniques to implement the front end functionality for a social media application.</p>

<h2 id="brief" >Brief<a    href="#brief" ></a></h2><i > </i>

<p>You have been tasked with producing a new JavaScript front end client for an existing social media platform. The client application must be attractive and responsive, but you have an otherwise blank slate in terms of theme design language.</p>

<p>Using the provided API and API documentation, create a functioning user interface that allows for <strong>viewing, posting, editing and deleting</strong> social media content.</p>

<p>Social API routes require authorization via JWT (JSON Web Tokens). You will need to register an account and login to access your token.</p>

<p>In order to complete the required features you will also need to make use of <code>GET</code>, <code>POST</code>, <code >PUT</code>, and <code>DELETE</code> HTTP methods.</p>

<p>Using localStorage is highly recommended, especially for storing JWT tokens.</p>

<p>A finished project fulfills the requirements below with an easy to use and error-free user interface.</p>

<h3 id="required-features">Required Features<a    href="#required-features" ></a></h3>

<p>The following user stories are required for a passing submission:</p>

<ul>
  <li>User with <code >@noroff.no</code> or <code >@stud.noroff.no</code> email can register profile</li>
  <li>Registered user can login</li>
  <li>User can view a post content feed</li>
  <li>User can filter the post content feed</li>
  <li>User can search the post content feed</li>
  <li>User can view a post content item by ID</li>
  <li>User can create a post content item</li>
  <li>User can update a post content item</li>
  <li>User can delete a post content item</li>
</ul>

<h3 id="additional-features" >Additional Features<a    href="#additional-features" ></a></h3>

<p>The following user stories are optional:</p>

<ul>
  <li>User can create a comment on a post</li>
  <li>User can edit profile media</li>
  <li>User can follow/unfollow a profile</li>
  <li>User can react to a post content item</li>
</ul>

<h3 id="team-work" >Team Work:<a    href="#team-work" ></a></h3>

<p>This assignment allows for team work in groups of 2 students. Students forming a work group will need to coordinate closely throughout the planning, development and testing processes. By working in a pair you are expected to implement additional features.</p>

<p>Commit regularly and use branches to prevent conflicts with your teammate as you work on the same codebase.</p>

<h2 id="development-process" >Development Process:<a    href="#development-process" ></a></h2><i > </i>

<ol>
  <li>Create or select one repository to use throughout this project.</li>
  <li>Create a <code >js2</code> branch from the default <code >master</code> or <code >main</code> branch.</li>
  <li>You may use either Trello or GitHub Projects to manage your development tasks. If you are using Trello please make sure that your board is public and that a link is provided in your <code >readme.md</code> file. Make sure to detail tasks accurately and divide them evenly if working a group.</li>
</ol>

<p>Examples of overly vague tasks:</p>
<ul>
  <li>Make the HTML for the post page</li>
  <li>Website Styling</li>
  <li>JavaScript for API</li>
  <li>Test the website</li>
</ul>

<p>Examples of detailed &amp; accurate tasks:</p>
<ul>
  <li>Create search form HTML</li>
  <li>Search form SCSS styling</li>
  <li>Filter posts function</li>
  <li>Implement search event listener</li>
</ul>

<ol>
  <li>Review the <a href="https://noroff-api-docs.netlify.app/social-endpoints/authentication">API Guide</a> and <a href="https://nf-api.onrender.com/docs">API Documentation</a>.</li>
  <li>Plan your approach, desired features and work strategy.</li>
  <li>Implement the required features as per your work plan.</li>
</ol>

<blockquote>
  <p>All PRs should be made to <code >js2</code> not to the default branch.</p>
</blockquote>

<blockquote>
  <p>For example, branch <code >search-functionality</code> should be created from, and merged into, branch <code >js2</code>.</p>
</blockquote>

<ol>
  <li>Submit a link to your repository at the correct branch on the Moodle forum for peer review.</li>
  <li>Review 2 of your peers projects. (4 per team)</li>
</ol>

<blockquote>
  <p><a href="https://vimeo.com/725676411/fabede2ebb">Video Resource: Branching and providing feedback</a></p>
</blockquote>

<ol>
  <li>Open a Pull Request from <code >js2</code> into the default branch. Contact a teacher on Discord for their feedback. If there is a particular area of concern please ensure to pass this on with your request. Add this teacher as a reviewer on your PR. Please make sure to plan for this review prior to your deadline.</li>
  <li>Implement the feedback gathered from your review, but leave the PR open.</li>
  <li>Deliver the link to this PR in Moodle. A passing submission will be approved and merged by the reviewer. This is a direct analogue of the professional review process.</li>
</ol>

<h2 id="restrictions" >Restrictions<a    href="#restrictions" ></a></h2><i > </i>

<ul>
  <li>Required functionality must be implemented in original, pure JavaScript.</li>
  <li>A CSS Framework may be used to build the application UI.</li>
  <li>A <code >.gitignore</code> file must be provided including <code >node_modules</code>. This folder must be untracked.</li>
  <li>Content posted on the API is public and associated with your identity. Be appropriate and respectful.</li>
</ul>

<h2 id="resources" >Resources<a    href="#resources" ></a></h2><i > </i>

<ul>
  <li><a href="https://noroff-api-docs.netlify.app/social-endpoints/authentication">API Guide</a></li>
  <li><a href="https://nf-api.onrender.com/docs">API Documentation</a>.</li>
</ul>

<hr >
