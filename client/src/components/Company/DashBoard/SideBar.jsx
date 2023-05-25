import styled from "@emotion/styled";
import {
  ManageAccounts,
  Event,
  Timeline,
  DeliveryDining,
  ViewList,
  AutoGraph,
  RequestQuote,
  Storage,
  ArrowForward,
} from "@mui/icons-material";

const Section = styled.section`
  padding: 2rem;
  margin: 1rem 0;
  width: 25%;
  border-right: 1px solid black;
`;

const MainTitle = styled.h3`
  font-size: 1.5rem;
`;

const LinkBox = styled.div``;

const LinkItem = styled.div`
  padding: 1rem;
  display: flex;
  flex-direction: column;
`;

const Link = styled.a`
  margin: 0.2rem 0;
  display: inline-flex;
  align-items: center;
  text-decoration: none;
  color: black;
  &:hover {
    scale: 1.05;
    transition: 0.3s all ease-out;
    cursor: pointer;
  }
`;

function SideBar() {
  const comp = JSON.parse(localStorage.getItem("comp"));
  return (
    <Section>
      <LinkBox>
        <MainTitle>Packages</MainTitle>
        <LinkItem>
          <Link href={`/package/manage/${comp._id}`}>
            <ManageAccounts sx={{ mr: 1 }} />
            Manage Packages
          </Link>
          <Link href={`/package/todays/${comp._id}`}>
            <Event sx={{ mr: 1 }} />
            Todays Packages
          </Link>
          <Link href={`/package/track/${comp._id}`}>
            <Timeline sx={{ mr: 1 }} />
            Track Packages
          </Link>
          <Link href={`/package/delivered/${comp._id}`}>
            <DeliveryDining sx={{ mr: 1 }} />
            Delivered Packages
          </Link>
        </LinkItem>
      </LinkBox>
      <LinkBox>
        <MainTitle>Employees</MainTitle>
        <LinkItem>
          <Link href={`/employees/${comp._id}`}>
            <Event sx={{ mr: 1 }} />
            Schedule Packages
          </Link>
          <Link href={`/employees/track/${comp._id}`}>
            <Timeline sx={{ mr: 1 }} />
            Track Employees
          </Link>
          <Link href={`/employees/view/${comp._id}`}>
            <ViewList sx={{ mr: 1 }} />
            View Employees
          </Link>
          <Link href={`/employees/manage/${comp._id}`}>
            <ManageAccounts sx={{ mr: 1 }} />
            Manage Employees
          </Link>
        </LinkItem>
      </LinkBox>
      <LinkBox>
        <MainTitle>Sales</MainTitle>
        <LinkItem>
          <Link href={`/employees/schedule/${comp._id}`}>
            <AutoGraph sx={{ mr: 1 }} />
            Analytics
          </Link>
          <Link href={`/employees/track/${comp._id}`}>
            <RequestQuote sx={{ mr: 1 }} />
            Expenses
          </Link>
          <Link href={`/employees/view/${comp._id}`}>
            <Storage sx={{ mr: 1 }} />
            Records
          </Link>
          <Link href={`/employees/manage/${comp._id}`}>
            <ArrowForward sx={{ mr: 1 }} />
            Others
          </Link>
        </LinkItem>
      </LinkBox>
      <LinkBox>
        <MainTitle>Sales</MainTitle>
        <LinkItem>
          <Link href={`/employees/schedule/${comp._id}`}>
            <AutoGraph sx={{ mr: 1 }} />
            Analytics
          </Link>
          <Link href={`/employees/track/${comp._id}`}>
            <RequestQuote sx={{ mr: 1 }} />
            Expenses
          </Link>
          <Link href={`/employees/view/${comp._id}`}>
            <Storage sx={{ mr: 1 }} />
            Records
          </Link>
          <Link href={`/employees/manage/${comp._id}`}>
            <ArrowForward sx={{ mr: 1 }} />
            Others
          </Link>
        </LinkItem>
      </LinkBox>
    </Section>
  );
}

export default SideBar;
