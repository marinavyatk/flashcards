export const confirmEmail = `
  <div style="background-color: #ffffff; font-family: 'Roboto', sans-serif; color: #ffffff; width: 100%; padding: 20px 0;">
    <table width="100%" cellspacing="0" cellpadding="0" border="0" align="center">
      <tr>
        <td align="center">
          <table width="420" cellspacing="0" cellpadding="0" border="0" style="background-color: #171717; border-radius: 8px; padding: 33px 36px 25px;">
            <tr>
              <td align="center" style="color: #ffffff;">
                <h1 style="margin: 0; color: #ffffff;">Hello, ##name##!</h1>
              </td>
            </tr>
            <tr>
              <td align="center" style="color: #ffffff; padding: 20px 0;">
                <p style="margin: 0; color: #ffffff;">
                  Welcome! You have just filled out the registration form on 
                  <a href="http://localhost:3000/" target="_blank" style="color: #a280ff;">FlashCards</a>. 
                  Please confirm your email by clicking on the link below:
                </p>
              </td>
            </tr>
            <tr>
              <td align="center" style="padding: 20px 0;">
                <a href="http://localhost:3000/confirm-email/##token##" style="display: block; text-align: center; padding: 12px 0; background-color: #a280ff; color: #ffffff; text-decoration: none; border-radius: 4px; width: 100%;">Confirm Email</a>
              </td>
            </tr>
            <tr>
              <td align="center" style="color: #ffffff; padding: 20px 0;">
                <p style="margin: 0; color: #ffffff;">
                  If it doesn't work, copy and paste the following link in your browser:
                  <br />
                  <span style="color: #a280ff; text-decoration: underline;">http://localhost:3000/confirm-email/##token##</span>
                </p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </div>
`

export const recoverPasswordEmail = `
  <div style="background-color: #e1deff; font-family: 'Roboto', sans-serif; color: #ffffff; width: 100%; padding: 20px 0;">
    <table width="100%" cellspacing="0" cellpadding="0" border="0" align="center">
      <tr>
        <td align="center">
          <table width="420" cellspacing="0" cellpadding="0" border="0" style="background-color: #171717; border-radius: 8px; padding: 33px 36px 25px;">
            <tr>
              <td align="center" style="color: #ffffff;">
                <h1 style="margin: 0; color: #ffffff;">Hello, ##name##!</h1>
              </td>
            </tr>
            <tr>
              <td align="center" style="color: #ffffff; padding: 20px 0;">
                <p style="margin: 0; color: #ffffff;">Click here to recover your password. If this wasn't you, please ignore this message.</p>
              </td>
            </tr>
            <tr>
              <td align="center" style="padding: 20px 0;">
                <a href="http://localhost:5173/create-new-password/##token##" style="display: block; text-align: center; padding: 12px 0; background-color: #a280ff; color: #ffffff; text-decoration: none; border-radius: 4px; width: 100%;">Recover password</a>
              </td>
            </tr>
            <tr>
              <td align="center" style="color: #ffffff; padding: 20px 0;">
                <p style="margin: 0; color: #ffffff;">If it doesn't work, copy and paste the following link in your browser:<br/>
                http://localhost:5173/create-new-password/##token##</p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </div>
`
