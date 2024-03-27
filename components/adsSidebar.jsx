import React, { useState } from 'react';

function AdsSidebar() {
  

  return (  
      <div className="w-full lg:w-5/12">
        <div className="flex-col sm:flex-row flex-wrap flex gap-5 text-start my-5">
          <div className="flex-1 text-start">
            <a className="block h-[87%] w-[87%] rounded-2xl outline-none focus:outline-none focus-visible:outline focus-visible:outline-link focus:outline-offset-2 focus-visible:dark:focus:outline-link-dark" href="https://auth.upsun.com/register?utm_source=devto&amp;utm_medium=paid_social&amp;utm_campaign=conversion_upsun_debug_faster">
              <p>
                <img src="https://res.cloudinary.com/practicaldev/image/fetch/s--UYzqGtaH--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_100%2Cw_350/https://pro.forem.tools/rails/active_storage/blobs/redirect/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBcEFCIiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--753cca82aef31525b935f311d219aefb5538d5d7/debug-much-faster-1200-1200.png" alt="Billboard image" width="1200" height="1200" loading="lazy" />
              </p>
            </a>
          </div>
        </div>
      </div>
    );
  }
  
  export default AdsSidebar;