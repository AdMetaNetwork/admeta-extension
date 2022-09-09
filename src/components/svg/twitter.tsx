import { FC } from "react";

type Prop = {
  handleClick: () => void
}

const Twitter: FC<Prop> = ({ handleClick }) => {
  return (
    <svg width="16" height="17" viewBox="0 0 16 17" fill="none" style={{ cursor: 'pointer' }} onClick={handleClick} xmlns="http://www.w3.org/2000/svg">
      <path d="M15.9992 3.91489C15.4 4.17977 14.7645 4.35373 14.1138 4.43101C14.7996 4.02112 15.313 3.37602 15.5581 2.61594C14.9144 2.99872 14.2088 3.26698 13.4733 3.41209C12.9793 2.88387 12.3245 2.53355 11.6106 2.4156C10.8968 2.29764 10.164 2.41866 9.52611 2.75984C8.88822 3.10102 8.381 3.64324 8.08329 4.30221C7.78559 4.96118 7.71409 5.69998 7.87991 6.40374C6.57465 6.33837 5.29775 5.99941 4.13209 5.40888C2.96644 4.81835 1.93809 3.98944 1.11381 2.97597C0.822049 3.47677 0.668725 4.04606 0.669545 4.62554C0.669545 5.7629 1.24882 6.7677 2.12951 7.35599C1.60833 7.33959 1.09861 7.19894 0.642857 6.94576V6.98654C0.643014 7.74403 0.905313 8.47815 1.38528 9.06443C1.86525 9.65072 2.53335 10.0531 3.27629 10.2033C2.79248 10.3343 2.28517 10.3536 1.79278 10.2598C2.00225 10.9118 2.41052 11.482 2.96043 11.8906C3.51034 12.2992 4.17435 12.5257 4.8595 12.5384C4.17856 13.0729 3.39888 13.4679 2.56506 13.701C1.73123 13.9341 0.859598 14.0007 0 13.897C1.50055 14.8613 3.24733 15.3733 5.0314 15.3716C11.0699 15.3716 14.3721 10.3727 14.3721 6.03744C14.3721 5.89625 14.3681 5.75349 14.3619 5.61387C15.0046 5.14964 15.5593 4.57457 16 3.91567L15.9992 3.91489Z" fill="#A6A4AF" />
    </svg>
  )
}

export default Twitter;